import admin from 'firebase-admin';

// Initialize Firebase Admin
let serviceAccount;
try {
  if (process.env.FIREBASE_SERVICE_ACCOUNT_BASE64) {
    const decodedServiceAccount = Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_BASE64, 'base64').toString('utf-8');
    serviceAccount = JSON.parse(decodedServiceAccount);
    console.log('✅ Firebase Service Account loaded from base64');
  } else {
    console.log('❌ FIREBASE_SERVICE_ACCOUNT_BASE64 not found');
    process.exit(1);
  }

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  console.log('🔥 Firebase Admin initialized');
} catch (error: any) {
  console.error('❌ Failed to load Firebase Service Account:', error.message);
  process.exit(1);
}

export const auth = admin.auth();
export const db = admin.firestore();
export default admin;
