import express from 'express';
import * as userController from '../controllers/web/userController.js';
import { errorHandler, notFoundHandler } from '../middleware/errorHandler.js';

const router = express.Router();

// Home route with application features
router.get('/', (req, res) => {
  res.render('home', {
    title: 'PetMatch',
    features: [
      { name: 'Usuários', path: '/users', description: 'Gerencie os usuários do sistema' },
      { name: 'Cadastrar Usuário', path: '/users/new', description: 'Registre novos usuários' }
    ]
  });
});

// User routes - HTML views
router.get('/users', userController.index);
router.get('/users/new', userController.create);
router.get('/users/:id', userController.show);
router.get('/users/:id/edit', userController.edit);

// User routes - Form submissions
router.post('/users', userController.store);
router.put('/users/:id', userController.update);
router.delete('/users/:id', userController.destroy);

// Error handling
router.use(notFoundHandler);
router.use(errorHandler);

export default router;