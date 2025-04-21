import express from 'express';
import * as shelterController from '../controllers/web/shelterController.js';
import * as userController from '../controllers/web/userController.js';
import { errorHandler, notFoundHandler } from '../middleware/errorHandler.js';

const router = express.Router();

// Home route with application features
router.get('/', (req, res) => {
  res.render('home', {
    title: 'PetMatch',
    features: [
      { name: 'Usuários', path: '/users', description: 'Gerencie os usuários do sistema' },
      { name: 'Abrigos', path: '/shelters', description: 'Gerencie os abrigos parceiros' },
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

// Mount resource routers
router.use('/users', userRouter);
router.use('/shelters', shelterRouter);

// Error handling
router.use(notFoundHandler);
router.use(errorHandler);

export default router;