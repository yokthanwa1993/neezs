"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const firebase_1 = __importStar(require("../firebase"));
const crypto_1 = require("crypto");
const router = (0, express_1.Router)();
// POST /api/auth/register
router.post('/register', async (req, res) => {
    try {
        const { email, password, name } = req.body;
        if (!email || !password || !name) {
            return res.status(400).json({ message: 'Missing required fields: email, password, name' });
        }
        const userRecord = await firebase_1.auth.createUser({
            email,
            password,
            displayName: name,
        });
        const customToken = await firebase_1.auth.createCustomToken(userRecord.uid);
        res.status(201).json({
            message: 'User created successfully',
            uid: userRecord.uid,
            customToken
        });
    }
    catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: error.message });
    }
});
// POST /api/auth/login
router.post('/login', async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: 'Missing required field: email' });
        }
        const userRecord = await firebase_1.auth.getUserByEmail(email);
        const customToken = await firebase_1.auth.createCustomToken(userRecord.uid);
        res.status(200).json({
            message: 'Login successful',
            uid: userRecord.uid,
            customToken
        });
    }
    catch (error) {
        console.error('Login error:', error);
        if (error.code === 'auth/user-not-found') {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(500).json({ message: error.message });
    }
});
// POST /api/auth/line (for LIFF authentication)
router.post('/line', async (req, res) => {
    try {
        const { idToken, profile } = req.body;
        console.log('📥 Received LINE auth request:', {
            hasIdToken: !!idToken,
            hasProfile: !!profile,
            profile: profile
        });
        if (!idToken) {
            return res.status(400).json({ message: 'ID Token is required' });
        }
        // Create or get Firebase user based on LINE profile
        let userRecord;
        const lineUserId = profile?.userId || 'line_user_' + Date.now();
        console.log('👤 Processing LINE user:', {
            lineUserId,
            displayName: profile?.displayName,
            pictureUrl: profile?.pictureUrl
        });
        try {
            // Try to get existing user by custom claim
            userRecord = await firebase_1.auth.getUserByEmail(`${lineUserId}@line.com`);
            // Update existing user with latest profile data
            await firebase_1.auth.updateUser(userRecord.uid, {
                displayName: profile?.displayName || userRecord.displayName,
                photoURL: profile?.pictureUrl || userRecord.photoURL
            });
            // Get updated user record
            userRecord = await firebase_1.auth.getUser(userRecord.uid);
        }
        catch (error) {
            if (error.code === 'auth/user-not-found') {
                // Create new user
                userRecord = await firebase_1.auth.createUser({
                    email: `${lineUserId}@line.com`,
                    displayName: profile?.displayName || 'LINE User',
                    photoURL: profile?.pictureUrl,
                    disabled: false
                });
            }
            else {
                throw error;
            }
        }
        // If profile picture exists from LINE, persist a copy into Firebase Storage on first login
        let storedPictureUrl = undefined;
        try {
            const pictureUrl = profile?.pictureUrl || userRecord.photoURL;
            if (pictureUrl && typeof fetch !== 'undefined') {
                const resp = await fetch(pictureUrl);
                if (resp.ok) {
                    const arrBuf = await resp.arrayBuffer();
                    const buffer = Buffer.from(arrBuf);
                    const path = `uploads/profiles/${userRecord.uid}/line_${Date.now()}_${(0, crypto_1.randomUUID)()}.jpg`;
                    const file = firebase_1.bucket.file(path);
                    const token = (0, crypto_1.randomUUID)();
                    await file.save(buffer, {
                        contentType: resp.headers.get('content-type') || 'image/jpeg',
                        resumable: false,
                        metadata: { cacheControl: 'no-store', metadata: { firebaseStorageDownloadTokens: token } },
                    });
                    storedPictureUrl = `https://firebasestorage.googleapis.com/v0/b/${firebase_1.bucket.name}/o/${encodeURIComponent(path)}?alt=media&token=${token}`;
                }
            }
        }
        catch (e) {
            console.warn('Failed to mirror LINE profile image to Storage:', e);
        }
        // Upsert Firestore user document for seekers
        try {
            const uid = userRecord.uid;
            const userRef = firebase_1.db.collection('users').doc(uid);
            const now = firebase_1.default.firestore.FieldValue.serverTimestamp();
            const snapshot = await userRef.get();
            await userRef.set({
                name: userRecord.displayName || profile?.displayName || 'LINE User',
                email: userRecord.email || '',
                picture: storedPictureUrl || userRecord.photoURL || profile?.pictureUrl || '',
                provider: 'line',
                role: 'seeker',
                updatedAt: now,
                ...(snapshot.exists ? {} : { createdAt: now }),
            }, { merge: true });
        }
        catch (e) {
            console.warn('Failed to upsert Firestore user doc:', e);
        }
        // Create custom token
        const customToken = await firebase_1.auth.createCustomToken(userRecord.uid, {
            lineUserId: lineUserId,
            provider: 'line'
        });
        const responseData = {
            message: 'LINE authentication successful',
            customToken,
            user: {
                uid: userRecord.uid,
                displayName: userRecord.displayName,
                email: userRecord.email,
                pictureUrl: storedPictureUrl || userRecord.photoURL
            }
        };
        console.log('✅ Sending response:', responseData);
        res.set('Cache-Control', 'no-store');
        res.status(200).json(responseData);
    }
    catch (error) {
        console.error('LINE authentication error:', error);
        res.status(500).json({ message: error.message });
    }
});
// POST /api/auth/line-login
router.post('/line-login', async (req, res) => {
    try {
        const { lineToken } = req.body;
        if (!lineToken) {
            return res.status(400).json({ message: 'Missing LINE token' });
        }
        // TODO: Verify LINE token with LINE API
        // TODO: Get LINE profile
        // TODO: Create or update Firebase user
        // TODO: Return Firebase custom token
        res.status(200).json({
            message: 'LINE login successful',
            // customToken: firebaseToken
        });
    }
    catch (error) {
        console.error('LINE login error:', error);
        res.status(500).json({ message: error.message });
    }
});
// GET /api/auth/line-profile
router.get('/line-profile', async (req, res) => {
    try {
        const { lineToken } = req.query;
        if (!lineToken) {
            return res.status(400).json({ message: 'Missing LINE token' });
        }
        // TODO: Get LINE profile from LINE API
        // TODO: Return LINE profile data
        res.status(200).json({
            message: 'LINE profile retrieved',
            // profile: lineProfile
        });
    }
    catch (error) {
        console.error('LINE profile error:', error);
        res.status(500).json({ message: error.message });
    }
});
// POST /api/auth/line-webhook
router.post('/line-webhook', async (req, res) => {
    try {
        const { events } = req.body;
        if (!events) {
            return res.status(400).json({ message: 'Missing events' });
        }
        // TODO: Process LINE webhook events
        // TODO: Handle different event types (message, follow, etc.)
        res.status(200).json({ message: 'Webhook processed' });
    }
    catch (error) {
        console.error('LINE webhook error:', error);
        res.status(500).json({ message: error.message });
    }
});
exports.default = router;
//# sourceMappingURL=auth.js.map