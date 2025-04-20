import express from 'express';
import { createUser, getAllUsers, getUserById } from './controllers/userController.js';
import { greetUser } from './controllers/welcomeController.js';

const router = express.Router();

// Welcome route
router.get('/', greetUser);

// User routes
router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.post('/users', createUser);

router.use((req, res) => {
  res.status(404).json({ error: 'API endpoint not found' });
});

router.use((err, req, res) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

export default router;
