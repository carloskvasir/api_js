import express from 'express';
import * as adoptionRequestController from '../controllers/web/adoptionRequestController.js';
import * as petController from '../controllers/web/petController.js';
import * as shelterController from '../controllers/web/shelterController.js';
import * as tagController from '../controllers/web/tagController.js';
import * as userController from '../controllers/web/userController.js';
import { errorHandler, notFoundHandler } from '../middleware/errorHandler.js';
import imageRoutes from './web/imageRoutes.js';

const router = express.Router();

// Home route with application features
router.get('/', (req, res) => {
  res.render('home', {
    title: 'PetMatch',
    features: [
      { name: 'Usuários', path: '/users', description: 'Gerencie cadastros e informações dos usuários da plataforma' },
      { name: 'Abrigos', path: '/shelters', description: 'Cadastre e administre abrigos parceiros, suas localizações e informações de contato' },
      { name: 'Pets', path: '/pets', description: 'Cadastre animais disponíveis para adoção, incluindo fotos, características e histórico médico' },
      { name: 'Tags', path: '/tags', description: 'Gerencie tags para categorizar pets (saúde, comportamento, características físicas, etc.)' },
      { name: 'Adoções', path: '/adoptions', description: 'Gerencie solicitações de adoção, incluindo aprovação, rejeição e acompanhamento' },
      { name: 'Imagens', path: '/images', description: 'Gerencie as imagens dos pets, incluindo upload, visualização e organização das fotos' },
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
userRouter.post('/:id/edit', userController.update);
userRouter.post('/:id/delete', userController.destroy);

// Create shelter routes router
const shelterRouter = express.Router();
shelterRouter.get('/', shelterController.index);
shelterRouter.get('/new', shelterController.create);
shelterRouter.post('/', shelterController.store);
shelterRouter.get('/:id', shelterController.show);
shelterRouter.get('/:id/edit', shelterController.edit);
shelterRouter.post('/:id/edit', shelterController.update);
shelterRouter.post('/:id/delete', shelterController.destroy);

// Create pet routes router
const petRouter = express.Router();
petRouter.get('/', petController.index);
petRouter.get('/new', petController.create);
petRouter.post('/', petController.store);
petRouter.get('/:id', petController.show);
petRouter.get('/:id/edit', petController.edit);
petRouter.post('/:id/edit', petController.update);
petRouter.post('/:id/delete', petController.destroy);
// Rotas para gerenciar tags de pets
petRouter.post('/:id/tags', petController.addTag);
petRouter.post('/:id/tags/remove', petController.removeTag);

// Create adoption request routes router
const adoptionRouter = express.Router();
adoptionRouter.get('/', adoptionRequestController.index);
adoptionRouter.get('/new', adoptionRequestController.create);
adoptionRouter.post('/', adoptionRequestController.store);
adoptionRouter.get('/:id', adoptionRequestController.show);
adoptionRouter.get('/:id/edit', adoptionRequestController.edit);
adoptionRouter.post('/:id/edit', adoptionRequestController.update);
adoptionRouter.post('/:id/delete', adoptionRequestController.destroy);

// Create tag routes router
const tagRouter = express.Router();
tagRouter.get('/', tagController.index);
tagRouter.get('/stats', tagController.stats);
tagRouter.get('/new', tagController.new_);
tagRouter.post('/', tagController.create);
tagRouter.get('/:id', tagController.show);
tagRouter.get('/:id/edit', tagController.edit);
tagRouter.post('/:id/edit', tagController.update);
tagRouter.post('/:id/delete', tagController.destroy);

// Mount resource routers
router.use('/users', userRouter);
router.use('/shelters', shelterRouter);
router.use('/pets', petRouter);
router.use('/tags', tagRouter);
router.use('/adoptions', adoptionRouter);
router.use('/images', imageRoutes);

// Error handling
router.use(notFoundHandler);
router.use(errorHandler);

export default router;