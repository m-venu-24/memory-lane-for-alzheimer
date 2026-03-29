import { initializeApp, applicationDefault, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

function parseServiceAccount() {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    throw new Error('FIREBASE_SERVICE_ACCOUNT must be valid JSON.');
  }
}

export function initFirebaseAdmin() {
  if (getApps().length > 0) {
    return { db: getFirestore(), enabled: true, mode: 'existing-app' };
  }

  const serviceAccount = parseServiceAccount();

  if (serviceAccount) {
    initializeApp({ credential: cert(serviceAccount) });
    return { db: getFirestore(), enabled: true, mode: 'service-account-json' };
  }

  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    initializeApp({ credential: applicationDefault() });
    return { db: getFirestore(), enabled: true, mode: 'application-default' };
  }

  return { db: null, enabled: false, mode: 'not-configured' };
}