import express from 'express';
import { greetUser } from './controllers/welcomeController.js';

const router = express.Router();

router.get('/', greetUser);

router.use((req, res) => {
  res.status(404).json({ error: 'API endpoint not found' });
});

router.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

export default router;
