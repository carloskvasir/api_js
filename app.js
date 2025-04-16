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
app.use('/', apiRouter);

export default app;
