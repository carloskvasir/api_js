import express from 'express';
import { Sequelize } from 'sequelize';
import apiRouter from './routes.js';

const app = express();

const postgres_url = 'postgres://admin:admin@localhost:5432/testdb';

const sequelize = new Sequelize(postgres_url, {
  dialect: 'postgres',
  logging: false,
});

// Check database connection and version
sequelize.authenticate()
  .then(() => sequelize.query('SELECT version();'))
  .then(([results]) => {
    console.log('Database version:', results[0].version);
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

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