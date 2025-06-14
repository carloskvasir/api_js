import express from 'express';
import {
    adoptionRequestController,
    imageController,
    logController,
    permissionController,
    petController,
    roleController,
    shelterController,
    tagController,
    userController
} from '../controllers/web/index.js';
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
      { name: 'Tags', path: '/tags', description: 'Gerencie tags para categorizar pets (saúde, comportamento, características físicas, etc.)' },
      { name: 'Adoções', path: '/adoptions', description: 'Gerencie solicitações de adoção, incluindo aprovação, rejeição e acompanhamento' },
      { name: 'Imagens', path: '/images', description: 'Gerencie as imagens dos pets, incluindo upload, visualização e organização das fotos' },
      { name: 'Roles', path: '/roles', description: 'Gerencie roles de usuários e suas permissões no sistema' },
      { name: 'Permissões', path: '/permissions', description: 'Gerencie permissões individuais que podem ser atribuídas a roles' },
      { name: 'Logs', path: '/logs', description: 'Visualize logs de auditoria e atividades do sistema (MongoDB)' },
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
userRouter.get('/:id/delete', userController.destroy);

// Create shelter routes router
const shelterRouter = express.Router();
shelterRouter.get('/', shelterController.index);
shelterRouter.get('/new', shelterController.create);
shelterRouter.post('/', shelterController.store);
shelterRouter.get('/:id', shelterController.show);
shelterRouter.get('/:id/edit', shelterController.edit);
shelterRouter.post('/:id/edit', shelterController.update);
shelterRouter.get('/:id/delete', shelterController.destroy);

// Create pet routes router
const petRouter = express.Router();
petRouter.get('/', petController.index);
petRouter.get('/new', petController.create);
petRouter.post('/', petController.store);
petRouter.get('/:id', petController.show);
petRouter.get('/:id/edit', petController.edit);
petRouter.post('/:id/edit', petController.update);
petRouter.get('/:id/delete', petController.destroy);
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
adoptionRouter.get('/:id/delete', adoptionRequestController.destroy);

// Create tag routes router
const tagRouter = express.Router();
tagRouter.get('/', tagController.index);
tagRouter.get('/stats', tagController.stats);
tagRouter.get('/new', tagController.new_);
tagRouter.post('/', tagController.create);
tagRouter.get('/:id', tagController.show);
tagRouter.get('/:id/edit', tagController.edit);
tagRouter.post('/:id/edit', tagController.update);
tagRouter.get('/:id/delete', tagController.destroy);

// Create image routes router
const imageRouter = express.Router();
imageRouter.get('/', imageController.index);
imageRouter.get('/new', imageController.create);
imageRouter.post('/', imageController.store);
imageRouter.get('/:id', imageController.show);
imageRouter.get('/:id/edit', imageController.edit);
imageRouter.post('/:id/edit', imageController.update);
imageRouter.get('/:id/delete', imageController.destroy);

// Create role routes router
const roleRouter = express.Router();
roleRouter.get('/', roleController.index);
roleRouter.get('/new', roleController.create);
roleRouter.post('/', roleController.store);
roleRouter.get('/:id', roleController.show);
roleRouter.get('/:id/edit', roleController.edit);
roleRouter.post('/:id/update', roleController.update);
roleRouter.post('/:id/delete', roleController.destroy);

// Create permission routes router
const permissionRouter = express.Router();
permissionRouter.get('/', permissionController.index);
permissionRouter.get('/new', permissionController.create);
permissionRouter.post('/', permissionController.store);
permissionRouter.get('/:id', permissionController.show);
permissionRouter.get('/:id/edit', permissionController.edit);
permissionRouter.post('/:id/update', permissionController.update);
permissionRouter.post('/:id/delete', permissionController.destroy);

// Create log routes router (MongoDB)
const logRouter = express.Router();
logRouter.get('/', logController.index);
logRouter.get('/:id', logController.show);

// Mount resource routers
router.use('/users', userRouter);
router.use('/shelters', shelterRouter);
router.use('/pets', petRouter);
router.use('/tags', tagRouter);
router.use('/adoptions', adoptionRouter);
router.use('/images', imageRouter);
router.use('/roles', roleRouter);
router.use('/permissions', permissionRouter);
router.use('/logs', logRouter);

// Error handling
router.use(notFoundHandler);
router.use(errorHandler);

export default router;