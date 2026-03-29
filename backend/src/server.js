import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initFirebaseAdmin } from './firebaseAdmin.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '0.0.0.0';

const firebase = initFirebaseAdmin();

const fallbackPatients = [
  {
    id: 'P001',
    name: 'Raj Kumar',
    injuryType: 'Traumatic Brain Injury (TBI)',
    status: 'In Progress',
  },
  {
    id: 'P002',
    name: 'Priya Sharma',
    injuryType: 'Concussion',
    status: 'Recovering',
  },
];

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({
    ok: true,
    service: 'memory-lane-backend',
    firebase: firebase.enabled,
    firebaseMode: firebase.mode,
    date: new Date().toISOString(),
  });
});

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    api: 'v1',
    message: 'Backend is running',
    firebase: firebase.enabled,
    firebaseMode: firebase.mode,
  });
});

app.get('/api/patients', async (_req, res) => {
  try {
    if (!firebase.db) {
      return res.json({ source: 'fallback', patients: fallbackPatients });
    }

    const snapshot = await firebase.db.collection('patients').get();
    const patients = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    return res.json({ source: 'firestore', patients });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: 'Failed to fetch patients from Firestore.',
      error: error.message,
    });
  }
});

app.post('/api/patients', async (req, res) => {
  try {
    if (!firebase.db) {
      return res.status(400).json({
        ok: false,
        message: 'Firebase is not configured. Add FIREBASE_SERVICE_ACCOUNT or GOOGLE_APPLICATION_CREDENTIALS.',
      });
    }

    const patient = req.body;
    const docRef = await firebase.db.collection('patients').add(patient);
    return res.status(201).json({ ok: true, id: docRef.id });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: 'Failed to create patient in Firestore.',
      error: error.message,
    });
  }
});

if (process.env.VERCEL !== '1') {
  app.listen(PORT, HOST, () => {
    console.log(`Memory Lane backend running at http://${HOST}:${PORT}`);
    console.log(`Firebase mode: ${firebase.mode}`);
  });
}

export default app;