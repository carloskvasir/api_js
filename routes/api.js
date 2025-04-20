import express from 'express';
import * as userController from '../controllers/api/userController.js';
import { notFoundHandler, errorHandler } from '../middleware/errorHandler.js';

const router = express.Router();

// API v1 routes
const v1Router = express.Router();

// User routes
v1Router.get('/users', userController.getAllUsers);
v1Router.get('/users/:id', userController.getUserById);
v1Router.post('/users', userController.createUser);
v1Router.put('/users/:id', userController.updateUser);
v1Router.delete('/users/:id', userController.deleteUser);

// Mount v1 routes
router.use('/v1', v1Router);

// Error handling
router.use(notFoundHandler);
router.use(errorHandler);

export default router;