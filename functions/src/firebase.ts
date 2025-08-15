import admin from 'firebase-admin';

let serviceAccount: admin.ServiceAccount | undefined;

if (!admin.apps.length) {
  try {
    // Prefer non-reserved secret name, fallback to legacy env var if present
    const base64 = process.env.SERVICE_ACCOUNT_BASE64 || process.env.FIREBASE_SERVICE_ACCOUNT_BASE64;
    if (base64) {
      try {
        const decoded = Buffer.from(base64, 'base64').toString('utf-8');
        serviceAccount = JSON.parse(decoded);
        admin.initializeApp({ credential: admin.credential.cert(serviceAccount as admin.ServiceAccount) });
        console.log('🔥 Firebase Admin initialized (functions)');
      } catch (e: any) {
        console.warn('⚠️ Failed to parse SERVICE_ACCOUNT_BASE64, falling back to default credentials:', e?.message || e);
        admin.initializeApp();
        console.log('🔥 Firebase Admin initialized with default credentials');
      }
    } else {
      admin.initializeApp();
      console.log('🔥 Firebase Admin initialized with default credentials');
    }
  } catch (error: any) {
    console.error('Failed to initialize Firebase Admin (final fallback):', error?.message || error);
    // As absolute last resort, attempt default init to avoid boot crash
    try {
      admin.initializeApp();
      console.log('🔥 Firebase Admin initialized with default credentials (last resort)');
    } catch {}
  }
}

export const auth = admin.auth();
export const db = admin.firestore();
export const bucket = admin.storage().bucket('neeiz-01.firebasestorage.app');
export default admin;


