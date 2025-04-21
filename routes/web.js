import express from 'express';
import * as adoptionRequestController from '../controllers/web/adoptionRequestController.js';
import * as petController from '../controllers/web/petController.js';
import * as shelterController from '../controllers/web/shelterController.js';
import * as userController from '../controllers/web/userController.js';
import { errorHandler, notFoundHandler } from '../middleware/errorHandler.js';

const router = express.Router();

// Home route with application features
router.get('/', (req, res) => {
  res.render('home', {
    title: 'PetMatch',
    features: [
      { name: 'Usuários', path: '/users', description: 'Gerencie cadastros e informações dos usuários da plataforma' },
      { name: 'Abrigos', path: '/shelters', description: 'Cadastre e administre abrigos parceiros, suas localizações e informações de contato' },
      { name: 'Pets', path: '/pets', description: 'Cadastre animais disponíveis para adoção, incluindo fotos, características e histórico médico' },
      { name: 'Adoções', path: '/adoptions', description: 'Gerencie solicitações de adoção, incluindo aprovação, rejeição e acompanhamento' },
    ]
  });
});

// Create user routes router
const userRouter = express.Router();
userRouter.get('/', userController.index);
userRouter.get('/new', userController.create);
userRouter.post('/', userController.store);
userRouter.get('/:id', userController.show);
userRouter.get('/:id/edit', userController.edit);
userRouter.put('/:id', userController.update);
userRouter.delete('/:id', userController.destroy);

// Create shelter routes router
const shelterRouter = express.Router();
shelterRouter.get('/', shelterController.index);
shelterRouter.get('/new', shelterController.create);
shelterRouter.post('/', shelterController.store);
shelterRouter.get('/:id', shelterController.show);
shelterRouter.get('/:id/edit', shelterController.edit);
shelterRouter.put('/:id', shelterController.update);
shelterRouter.delete('/:id', shelterController.destroy);

// Create pet routes router
const petRouter = express.Router();
petRouter.get('/', petController.index);
petRouter.get('/new', petController.create);
petRouter.post('/', petController.store);
petRouter.get('/:id', petController.show);
petRouter.get('/:id/edit', petController.edit);
petRouter.put('/:id', petController.update);
petRouter.delete('/:id', petController.destroy);

// Create adoption request routes router
const adoptionRouter = express.Router();
adoptionRouter.get('/', adoptionRequestController.index);
adoptionRouter.get('/new', adoptionRequestController.create);
adoptionRouter.post('/', adoptionRequestController.store);
adoptionRouter.get('/:id', adoptionRequestController.show);
adoptionRouter.get('/:id/edit', adoptionRequestController.edit);
adoptionRouter.put('/:id', adoptionRequestController.update);
adoptionRouter.delete('/:id', adoptionRequestController.destroy);

// Mount resource routers
router.use('/users', userRouter);
router.use('/shelters', shelterRouter);
router.use('/pets', petRouter);
router.use('/adoptions', adoptionRouter);

// Error handling
router.use(notFoundHandler);
router.use(errorHandler);

export default router;