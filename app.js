import express from 'express';
import apiRouter from './routes.js';

const app = express();

app.use(express.json());
app.use('/', apiRouter);

export default app;
