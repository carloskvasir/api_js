import express from 'express';
import sequelize from './config/sequelize.js';
import apiRouter from './routes.js';

const app = express();

// Verifica a conexão com o banco ao iniciar a aplicação
try {
  await sequelize.authenticate();
  const [results] = await sequelize.query('SELECT version()');
  console.log('Database version:', results[0].version);
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

app.use(express.json());
app.use('/', apiRouter);

export default app;
