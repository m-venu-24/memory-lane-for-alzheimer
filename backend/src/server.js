import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '0.0.0.0';

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({
    ok: true,
    service: 'memory-lane-backend',
    date: new Date().toISOString(),
  });
});

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    api: 'v1',
    message: 'Backend is running',
  });
});

app.get('/api/patients', (_req, res) => {
  res.json([
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
    }
  ]);
});

app.listen(PORT, HOST, () => {
  console.log(`Memory Lane backend running at http://${HOST}:${PORT}`);
});