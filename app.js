import express from 'express';
import apiRouter from './routes.js';

const app = express();

/* ───────────────────────  GLOBAL MIDDLEWARE  ──────────────────────── */
app.use(express.json());

/* ───────────────────────────  ROUTES  ─────────────────────────────── */
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to my API 📚' });
});

app.use('/api', apiRouter);

/* ───────────────────────  404 / ERROR HANDLERS  ───────────────────── */
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not found' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

export default app;