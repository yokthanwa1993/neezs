import { Router, Request, Response } from 'express';
import admin, { auth, db, bucket } from '../firebase';
import { randomUUID } from 'crypto';
import * as functions from 'firebase-functions';

const router = Router();

// POST /api/auth/register
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { email, password, name, role = 'seeker' } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ message: 'Missing required fields: email, password, name' });
    }

    const userRecord = await auth.createUser({
      email,
      password,
      displayName: name,
    });

    // Set custom claims
    await auth.setCustomUserClaims(userRecord.uid, { role });

    const customToken = await auth.createCustomToken(userRecord.uid);

    res.status(201).json({ 
      message: 'User created successfully',
      uid: userRecord.uid,
      customToken,
      role
    });
  } catch (error: any) {
    console.error('Registration error:', error);
    res.status(500).json({ message: error.message });
  }
});

// POST /api/auth/login
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Missing required field: email' });
    }

    const userRecord = await auth.getUserByEmail(email);
    const customToken = await auth.createCustomToken(userRecord.uid);
    const role = (userRecord.customClaims as { role?: string })?.role || 'seeker';

    res.status(200).json({
      message: 'Login successful',
      uid: userRecord.uid,
      customToken,
      role
    });
  } catch (error: any) {
    console.error('Login error:', error);
    if ((error as any).code === 'auth/user-not-found') {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(500).json({ message: error.message });
  }
});

// POST /api/auth/employer/login
router.post('/employer/login', async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Missing required field: email' });
    }

    const userRecord = await auth.getUserByEmail(email);
    const role = (userRecord.customClaims as { role?: string })?.role;

    if (role !== 'employer') {
      return res.status(403).json({ message: 'Forbidden: Access is denied' });
    }

    const customToken = await auth.createCustomToken(userRecord.uid);

    res.status(200).json({
      message: 'Login successful',
      uid: userRecord.uid,
      customToken,
      role
    });
  } catch (error: any) {
    console.error('Login error:', error);
    if ((error as any).code === 'auth/user-not-found') {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(500).json({ message: error.message });
  }
});

// POST /api/auth/line (for LIFF authentication)
router.post('/line', async (req: Request, res: Response) => {
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

    // Resolve lineUserId from profile or by verifying id_token
    let lineUserId = profile?.userId as string | undefined;
    try {
      if (!lineUserId) {
        const channelId = process.env.LINE_CHANNEL_ID || (functions.config?.() as any)?.line?.channel_id;
        if (!channelId) {
          console.warn('Missing LINE_CHANNEL_ID; cannot verify id_token to obtain sub');
        } else {
          const verifyResp = await fetch('https://api.line.me/oauth2/v2.1/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `id_token=${encodeURIComponent(idToken)}&client_id=${encodeURIComponent(channelId)}`
          });
          if (verifyResp.ok) {
            const verifyData = await verifyResp.json() as any;
            if (verifyData?.sub) {
              lineUserId = verifyData.sub as string;
              console.log('✅ Derived lineUserId from id_token verify:', lineUserId);
            } else {
              console.warn('LINE verify did not return sub field');
            }
          } else {
            console.warn('LINE verify request failed:', verifyResp.status, await verifyResp.text());
          }
        }
      }
    } catch (e) {
      console.warn('Failed to verify id_token for lineUserId:', e);
    }

    // Fallback if still missing
    if (!lineUserId) {
      lineUserId = 'line_user_' + Date.now();
      console.warn('Using fallback lineUserId:', lineUserId);
    }

    // Create or get Firebase user based on LINE profile
    let userRecord;
    console.log('👤 Processing LINE user:', {
      lineUserId,
      displayName: profile?.displayName,
      pictureUrl: profile?.pictureUrl
    });
    
    try {
      // Try to get existing user by derived email
      userRecord = await auth.getUserByEmail(`${lineUserId}@line.com`);
      
      // Update existing user with latest profile data
      await auth.updateUser(userRecord.uid, {
        displayName: profile?.displayName || userRecord.displayName,
        photoURL: profile?.pictureUrl || userRecord.photoURL
      });
      
      // Get updated user record
      userRecord = await auth.getUser(userRecord.uid);
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        // Create new user
        userRecord = await auth.createUser({
          email: `${lineUserId}@line.com`,
          displayName: profile?.displayName || 'LINE User',
          photoURL: profile?.pictureUrl,
          disabled: false
        });
      } else {
        throw error;
      }
    }

    // If profile picture exists from LINE, persist a copy into Firebase Storage on first login
    let storedPictureUrl: string | undefined = undefined;
    try {
      const pictureUrl = profile?.pictureUrl || userRecord.photoURL;
      if (pictureUrl && typeof fetch !== 'undefined') {
        const resp = await fetch(pictureUrl as string);
        if (resp.ok) {
          const arrBuf = await (resp as any).arrayBuffer();
          const buffer = Buffer.from(arrBuf);
          const path = `uploads/profiles/${userRecord.uid}/line_${Date.now()}_${randomUUID()}.jpg`;
          const file = bucket.file(path);
          const token = randomUUID();
          await file.save(buffer, {
            contentType: resp.headers.get('content-type') || 'image/jpeg',
            resumable: false,
            metadata: { cacheControl: 'no-store', metadata: { firebaseStorageDownloadTokens: token } },
          } as any);
          storedPictureUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(path)}?alt=media&token=${token}`;
        }
      }
    } catch (e) {
      console.warn('Failed to mirror LINE profile image to Storage:', e);
    }

    // Upsert Firestore user document for seekers
    try {
      const uid = userRecord.uid;
      const userRef = db.collection('users').doc(uid);
      const now = admin.firestore.FieldValue.serverTimestamp();
      const snapshot = await userRef.get();
      
      console.log('💾 Writing to Firestore with lineUserId:', lineUserId);
      
      await userRef.set(
        {
          uid: uid,
          name: userRecord.displayName || profile?.displayName || 'LINE User',
          email: userRecord.email || '',
          picture: storedPictureUrl || userRecord.photoURL || profile?.pictureUrl || '',
          provider: 'line',
          role: 'seeker',
          lineUserId: lineUserId || 'missing_line_user_id',
          updatedAt: now,
          ...(snapshot.exists ? {} : { createdAt: now }),
        },
        { merge: true }
      );
      
      console.log('✅ Firestore user document written successfully');
    } catch (e) {
      console.warn('Failed to upsert Firestore user doc:', e);
    }

    // Create custom token
    const customToken = await auth.createCustomToken(userRecord.uid, {
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
  } catch (error: any) {
    console.error('LINE authentication error:', error);
    res.status(500).json({ message: error.message });
  }
});

// POST /api/auth/line/logout-notify
router.post('/line/logout-notify', async (req: Request, res: Response) => {
  try {
    const { lineUserId, message = 'Logout' } = req.body as { lineUserId?: string; message?: string };
    if (!lineUserId) {
      return res.status(400).json({ message: 'lineUserId is required' });
    }

    const channelAccessToken = process.env.LINE_CHANNEL_ACCESS_TOKEN || (functions.config?.() as any)?.line?.channel_access_token;
    if (!channelAccessToken) {
      console.error('Missing LINE_CHANNEL_ACCESS_TOKEN env var');
      return res.status(500).json({ message: 'Server misconfigured' });
    }

    const resp = await fetch('https://api.line.me/v2/bot/message/push', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${channelAccessToken}`,
      },
      body: JSON.stringify({
        to: lineUserId,
        messages: [
          { type: 'text', text: message }
        ],
      }),
    });

    if (!resp.ok) {
      const txt = await resp.text();
      console.error('LINE push error:', resp.status, txt);
      return res.status(502).json({ message: 'Failed to push message to LINE' });
    }

    return res.status(200).json({ ok: true });
  } catch (error: any) {
    console.error('Logout notify error:', error);
    return res.status(500).json({ message: error.message });
  }
});

// POST /api/auth/line-login
router.post('/line-login', async (req: Request, res: Response) => {
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
  } catch (error: any) {
    console.error('LINE login error:', error);
    res.status(500).json({ message: error.message });
  }
});

// GET /api/auth/line-profile
router.get('/line-profile', async (req: Request, res: Response) => {
  try {
    const { lineToken } = req.query as { lineToken?: string };

    if (!lineToken) {
      return res.status(400).json({ message: 'Missing LINE token' });
    }

    // TODO: Get LINE profile from LINE API
    // TODO: Return LINE profile data

    res.status(200).json({
      message: 'LINE profile retrieved',
      // profile: lineProfile
    });
  } catch (error: any) {
    console.error('LINE profile error:', error);
    res.status(500).json({ message: error.message });
  }
});

// POST /api/auth/line-webhook
router.post('/line-webhook', async (req: Request, res: Response) => {
  try {
    const { events } = req.body;

    if (!events || !Array.isArray(events) || events.length === 0) {
      return res.status(200).json({ message: 'No events to process' });
    }

    const channelAccessToken = process.env.LINE_CHANNEL_ACCESS_TOKEN || (functions.config?.() as any)?.line?.channel_access_token;
    if (!channelAccessToken) {
      console.error('Missing LINE_CHANNEL_ACCESS_TOKEN');
      return res.status(500).json({ message: 'Server misconfigured' });
    }

    for (const event of events) {
      if (event.type === 'message' && event.message.type === 'text') {
        try {
          await fetch('https://api.line.me/v2/bot/message/reply', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${channelAccessToken}`,
            },
            body: JSON.stringify({
              replyToken: event.replyToken,
              messages: [{ type: 'text', text: 'Webhook received' }],
            }),
          });
        } catch (replyError) {
          console.error('Failed to send LINE reply:', replyError);
        }
      }
    }

    res.status(200).json({ message: 'Webhook processed' });
  } catch (error: any) {
    console.error('LINE webhook error:', error);
    res.status(500).json({ message: error.message });
  }
});

export default router;



