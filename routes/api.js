import express from 'express';
import * as shelterController from '../controllers/api/shelterController.js';
import * as userController from '../controllers/api/userController.js';
import * as petController from '../controllers/api/petController.js';
import { errorHandler, notFoundHandler } from '../middleware/errorHandler.js';

const router = express.Router();

// API v1 routes
const v1Router = express.Router();

// User routes
v1Router.get('/users', userController.getAllUsers);
v1Router.get('/users/:id', userController.getUserById);
v1Router.post('/users', userController.createUser);
v1Router.put('/users/:id', userController.updateUser);
v1Router.delete('/users/:id', userController.deleteUser);

// Shelter routes
v1Router.get('/shelters', shelterController.getAllShelters);
v1Router.get('/shelters/:id', shelterController.getShelterById);
v1Router.post('/shelters', shelterController.createShelter);
v1Router.put('/shelters/:id', shelterController.updateShelter);
v1Router.delete('/shelters/:id', shelterController.deleteShelter);

// Pet routes
v1Router.get('/pets', petController.getAllPets);
v1Router.get('/pets/:id', petController.getPetById);
v1Router.post('/pets', petController.createPet);
v1Router.put('/pets/:id', petController.updatePet);
v1Router.delete('/pets/:id', petController.deletePet);

// Mount v1 routes
router.use('/v1', v1Router);

// Error handling
router.use(notFoundHandler);
router.use(errorHandler);

export default router;