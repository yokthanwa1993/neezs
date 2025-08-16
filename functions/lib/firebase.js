"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bucket = exports.db = exports.auth = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
let serviceAccount;
if (!firebase_admin_1.default.apps.length) {
    try {
        // Prefer non-reserved secret name, fallback to legacy env var if present
        const base64 = process.env.SERVICE_ACCOUNT_BASE64 || process.env.FIREBASE_SERVICE_ACCOUNT_BASE64;
        if (base64) {
            try {
                const decoded = Buffer.from(base64, 'base64').toString('utf-8');
                serviceAccount = JSON.parse(decoded);
                firebase_admin_1.default.initializeApp({ credential: firebase_admin_1.default.credential.cert(serviceAccount) });
                console.log('🔥 Firebase Admin initialized (functions)');
            }
            catch (e) {
                console.warn('⚠️ Failed to parse SERVICE_ACCOUNT_BASE64, falling back to default credentials:', e?.message || e);
                firebase_admin_1.default.initializeApp();
                console.log('🔥 Firebase Admin initialized with default credentials');
            }
        }
        else {
            firebase_admin_1.default.initializeApp();
            console.log('🔥 Firebase Admin initialized with default credentials');
        }
    }
    catch (error) {
        console.error('Failed to initialize Firebase Admin (final fallback):', error?.message || error);
        // As absolute last resort, attempt default init to avoid boot crash
        try {
            firebase_admin_1.default.initializeApp();
            console.log('🔥 Firebase Admin initialized with default credentials (last resort)');
        }
        catch { }
    }
}
exports.auth = firebase_admin_1.default.auth();
exports.db = firebase_admin_1.default.firestore();
exports.bucket = firebase_admin_1.default.storage().bucket('neeiz-01.firebasestorage.app');
exports.default = firebase_admin_1.default;
//# sourceMappingURL=firebase.js.map