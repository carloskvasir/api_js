import express from 'express';
import {
  logController,
  permissionController,
  petController,
  roleController,
  shelterController,
  tagController,
  userController
} from '../controllers/api/index.js';
import { errorHandler, notFoundHandler } from '../middleware/errorHandler.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: API para gerenciar usuários
 *   - name: Shelters
 *     description: API para gerenciar abrigos
 *   - name: Pets
 *     description: API para gerenciar pets
 *   - name: Tags
 *     description: API para gerenciar tags
 *   - name: Logs
 *     description: API para gerenciar logs
 *   - name: Roles
 *     description: API para gerenciar papéis
 *   - name: Permissions
 *     description: API para gerenciar permissões
 */

// API v1 routes
const v1Router = express.Router();

// User routes
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retorna todos os usuários
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
v1Router.get('/users', userController.getAllUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Retorna um usuário pelo ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Detalhes do usuário
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuário não encontrado
 */
v1Router.get('/users/:id', userController.getUserById);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Erro na requisição
 */
v1Router.post('/users', userController.createUser);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Atualiza um usuário existente
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Erro na requisição
 *       404:
 *         description: Usuário não encontrado
 */
v1Router.put('/users/:id', userController.updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Deleta um usuário
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do usuário
 *     responses:
 *       204:
 *         description: Usuário deletado com sucesso
 *       404:
 *         description: Usuário não encontrado
 */
v1Router.delete('/users/:id', userController.deleteUser);

// Shelter routes
/**
 * @swagger
 * /shelters:
 *   get:
 *     summary: Retorna todos os abrigos
 *     tags: [Shelters]
 *     responses:
 *       200:
 *         description: Lista de abrigos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Shelter'
 */
v1Router.get('/shelters', shelterController.getAllShelters);

/**
 * @swagger
 * /shelters/{id}:
 *   get:
 *     summary: Retorna um abrigo pelo ID
 *     tags: [Shelters]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do abrigo
 *     responses:
 *       200:
 *         description: Detalhes do abrigo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Shelter'
 *       404:
 *         description: Abrigo não encontrado
 */
v1Router.get('/shelters/:id', shelterController.getShelterById);

/**
 * @swagger
 * /shelters:
 *   post:
 *     summary: Cria um novo abrigo
 *     tags: [Shelters]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ShelterInput'
 *     responses:
 *       201:
 *         description: Abrigo criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Shelter'
 *       400:
 *         description: Erro na requisição
 */
v1Router.post('/shelters', shelterController.createShelter);

/**
 * @swagger
 * /shelters/{id}:
 *   put:
 *     summary: Atualiza um abrigo existente
 *     tags: [Shelters]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do abrigo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ShelterInput'
 *     responses:
 *       200:
 *         description: Abrigo atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Shelter'
 *       400:
 *         description: Erro na requisição
 *       404:
 *         description: Abrigo não encontrado
 */
v1Router.put('/shelters/:id', shelterController.updateShelter);

/**
 * @swagger
 * /shelters/{id}:
 *   delete:
 *     summary: Deleta um abrigo
 *     tags: [Shelters]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do abrigo
 *     responses:
 *       204:
 *         description: Abrigo deletado com sucesso
 *       404:
 *         description: Abrigo não encontrado
 */
v1Router.delete('/shelters/:id', shelterController.deleteShelter);

// Pet routes (rotas específicas primeiro)
/**
 * @swagger
 * /pets/search-by-tags:
 *   get:
 *     summary: Busca pets por tags
 *     tags: [Pets]
 *     parameters:
 *       - in: query
 *         name: tags
 *         schema:
 *           type: string
 *         description: IDs das tags separados por vírgula
 *     responses:
 *       200:
 *         description: Lista de pets que possuem as tags especificadas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pet'
 */
v1Router.get('/pets/search-by-tags', tagController.searchPetsByTags);

/**
 * @swagger
 * /pets/advanced-search:
 *   get:
 *     summary: Busca avançada de pets
 *     tags: [Pets]
 *     parameters:
 *       - in: query
 *         name: species
 *         schema:
 *           type: string
 *         description: Espécie do pet
 *       - in: query
 *         name: age
 *         schema:
 *           type: integer
 *         description: Idade do pet
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Status do pet
 *     responses:
 *       200:
 *         description: Lista de pets que atendem aos critérios de busca
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pet'
 */
v1Router.get('/pets/advanced-search', tagController.advancedPetSearch);

/**
 * @swagger
 * /pets-with-tags:
 *   get:
 *     summary: Retorna pets com suas tags
 *     tags: [Pets]
 *     responses:
 *       200:
 *         description: Lista de pets com suas tags associadas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 allOf:
 *                   - $ref: '#/components/schemas/Pet'
 *                   - type: object
 *                     properties:
 *                       tags:
 *                         type: array
 *                         items:
 *                           $ref: '#/components/schemas/Tag'
 */
v1Router.get('/pets-with-tags', tagController.getPetsWithTags);

/**
 * @swagger
 * /pets/{petId}/tags:
 *   post:
 *     summary: Adiciona tags a um pet
 *     tags: [Pets]
 *     parameters:
 *       - in: path
 *         name: petId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do pet
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tagIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 description: Array de IDs das tags
 *     responses:
 *       200:
 *         description: Tags adicionadas com sucesso
 *       404:
 *         description: Pet não encontrado
 */
v1Router.post('/pets/:petId/tags', tagController.addTagsToPet);

/**
 * @swagger
 * /pets/{petId}/tags/{tagId}:
 *   delete:
 *     summary: Remove uma tag de um pet
 *     tags: [Pets]
 *     parameters:
 *       - in: path
 *         name: petId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do pet
 *       - in: path
 *         name: tagId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da tag
 *     responses:
 *       204:
 *         description: Tag removida com sucesso
 *       404:
 *         description: Pet ou tag não encontrado
 */
v1Router.delete('/pets/:petId/tags/:tagId', tagController.removeTagFromPet);

// Pet CRUD routes (rotas genéricas por último)
/**
 * @swagger
 * /pets:
 *   get:
 *     summary: Retorna todos os pets
 *     tags: [Pets]
 *     responses:
 *       200:
 *         description: Lista de pets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pet'
 */
v1Router.get('/pets', petController.getAllPets);

/**
 * @swagger
 * /pets/{id}:
 *   get:
 *     summary: Retorna um pet pelo ID
 *     tags: [Pets]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do pet
 *     responses:
 *       200:
 *         description: Detalhes do pet
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pet'
 *       404:
 *         description: Pet não encontrado
 */
v1Router.get('/pets/:id', petController.getPetById);

/**
 * @swagger
 * /pets:
 *   post:
 *     summary: Cria um novo pet
 *     tags: [Pets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PetInput'
 *     responses:
 *       201:
 *         description: Pet criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pet'
 *       400:
 *         description: Erro na requisição
 */
v1Router.post('/pets', petController.createPet);

/**
 * @swagger
 * /pets/{id}:
 *   put:
 *     summary: Atualiza um pet existente
 *     tags: [Pets]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do pet
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PetInput'
 *     responses:
 *       200:
 *         description: Pet atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pet'
 *       400:
 *         description: Erro na requisição
 *       404:
 *         description: Pet não encontrado
 */
v1Router.put('/pets/:id', petController.updatePet);

/**
 * @swagger
 * /pets/{id}:
 *   delete:
 *     summary: Deleta um pet
 *     tags: [Pets]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do pet
 *     responses:
 *       204:
 *         description: Pet deletado com sucesso
 *       404:
 *         description: Pet não encontrado
 */
v1Router.delete('/pets/:id', petController.deletePet);

// Tag routes
/**
 * @swagger
 * /tags:
 *   get:
 *     summary: Retorna todas as tags
 *     tags: [Tags]
 *     responses:
 *       200:
 *         description: Lista de tags
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tag'
 */
v1Router.get('/tags', tagController.getAllTags);

/**
 * @swagger
 * /tags/{id}:
 *   get:
 *     summary: Retorna uma tag pelo ID
 *     tags: [Tags]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da tag
 *     responses:
 *       200:
 *         description: Detalhes da tag
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tag'
 *       404:
 *         description: Tag não encontrada
 */
v1Router.get('/tags/:id', tagController.getTagById);

/**
 * @swagger
 * /tags:
 *   post:
 *     summary: Cria uma nova tag
 *     tags: [Tags]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TagInput'
 *     responses:
 *       201:
 *         description: Tag criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tag'
 *       400:
 *         description: Erro na requisição
 */
v1Router.post('/tags', tagController.createTag);

/**
 * @swagger
 * /tags/{id}:
 *   put:
 *     summary: Atualiza uma tag existente
 *     tags: [Tags]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da tag
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TagInput'
 *     responses:
 *       200:
 *         description: Tag atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tag'
 *       400:
 *         description: Erro na requisição
 *       404:
 *         description: Tag não encontrada
 */
v1Router.put('/tags/:id', tagController.updateTag);

/**
 * @swagger
 * /tags/{id}:
 *   delete:
 *     summary: Deleta uma tag
 *     tags: [Tags]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da tag
 *     responses:
 *       204:
 *         description: Tag deletada com sucesso
 *       404:
 *         description: Tag não encontrada
 */
v1Router.delete('/tags/:id', tagController.deleteTag);

/**
 * @swagger
 * /tags/category/{category}:
 *   get:
 *     summary: Retorna tags por categoria
 *     tags: [Tags]
 *     parameters:
 *       - in: path
 *         name: category
 *         schema:
 *           type: string
 *           enum: [health, behavior, physical, care, other]
 *         required: true
 *         description: Categoria da tag
 *     responses:
 *       200:
 *         description: Lista de tags da categoria especificada
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tag'
 */
v1Router.get('/tags/category/:category', tagController.getTagsByCategory);

// Log routes
/**
 * @swagger
 * /logs:
 *   get:
 *     summary: Retorna todos os logs
 *     tags: [Logs]
 *     responses:
 *       200:
 *         description: Lista de logs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Log'
 */
v1Router.get('/logs', logController.getAllLogs);

/**
 * @swagger
 * /logs/{id}:
 *   get:
 *     summary: Retorna um log pelo ID
 *     tags: [Logs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do log
 *     responses:
 *       200:
 *         description: Detalhes do log
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Log'
 *       404:
 *         description: Log não encontrado
 */
v1Router.get('/logs/:id', logController.getLogById);

/**
 * @swagger
 * /logs:
 *   post:
 *     summary: Cria um novo log
 *     tags: [Logs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LogInput'
 *     responses:
 *       201:
 *         description: Log criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Log'
 *       400:
 *         description: Erro na requisição
 */
v1Router.post('/logs', logController.createLog);

/**
 * @swagger
 * /logs/{id}:
 *   put:
 *     summary: Atualiza um log existente
 *     tags: [Logs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do log
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LogInput'
 *     responses:
 *       200:
 *         description: Log atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Log'
 *       400:
 *         description: Erro na requisição
 *       404:
 *         description: Log não encontrado
 */
v1Router.put('/logs/:id', logController.updateLog);

/**
 * @swagger
 * /logs/{id}:
 *   delete:
 *     summary: Deleta um log
 *     tags: [Logs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do log
 *     responses:
 *       204:
 *         description: Log deletado com sucesso
 *       404:
 *         description: Log não encontrado
 */
v1Router.delete('/logs/:id', logController.deleteLog);

/**
 * @swagger
 * /logs/action/{action}:
 *   get:
 *     summary: Retorna logs por ação
 *     tags: [Logs]
 *     parameters:
 *       - in: path
 *         name: action
 *         schema:
 *           type: string
 *           enum: [CREATE, READ, UPDATE, DELETE]
 *         required: true
 *         description: Ação realizada
 *     responses:
 *       200:
 *         description: Lista de logs da ação especificada
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Log'
 */
v1Router.get('/logs/action/:action', logController.getLogsByAction);

/**
 * @swagger
 * /logs/user/{userId}:
 *   get:
 *     summary: Retorna logs por usuário
 *     tags: [Logs]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Lista de logs do usuário especificado
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Log'
 */
v1Router.get('/logs/user/:userId', logController.getLogsByUser);

// Role routes
/**
 * @swagger
 * /roles:
 *   get:
 *     summary: Retorna todos os papéis
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: Lista de papéis
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Role'
 */
v1Router.get('/roles', roleController.getAllRoles);

/**
 * @swagger
 * /roles/{id}:
 *   get:
 *     summary: Retorna um papel pelo ID
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do papel
 *     responses:
 *       200:
 *         description: Detalhes do papel
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *       404:
 *         description: Papel não encontrado
 */
v1Router.get('/roles/:id', roleController.getRoleById);

/**
 * @swagger
 * /roles:
 *   post:
 *     summary: Cria um novo papel
 *     tags: [Roles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RoleInput'
 *     responses:
 *       201:
 *         description: Papel criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *       400:
 *         description: Erro na requisição
 */
v1Router.post('/roles', roleController.createRole);

/**
 * @swagger
 * /roles/{id}:
 *   put:
 *     summary: Atualiza um papel existente
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do papel
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RoleInput'
 *     responses:
 *       200:
 *         description: Papel atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *       400:
 *         description: Erro na requisição
 *       404:
 *         description: Papel não encontrado
 */
v1Router.put('/roles/:id', roleController.updateRole);

/**
 * @swagger
 * /roles/{id}:
 *   delete:
 *     summary: Deleta um papel
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do papel
 *     responses:
 *       204:
 *         description: Papel deletado com sucesso
 *       404:
 *         description: Papel não encontrado
 */
v1Router.delete('/roles/:id', roleController.deleteRole);

/**
 * @swagger
 * /roles/{id}/permissions/{permissionId}:
 *   post:
 *     summary: Adiciona uma permissão a um papel
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do papel
 *       - in: path
 *         name: permissionId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da permissão
 *     responses:
 *       200:
 *         description: Permissão adicionada ao papel com sucesso
 *       404:
 *         description: Papel ou permissão não encontrado
 */
v1Router.post('/roles/:id/permissions/:permissionId', roleController.addPermissionToRole);

/**
 * @swagger
 * /roles/{id}/permissions/{permissionId}:
 *   delete:
 *     summary: Remove uma permissão de um papel
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do papel
 *       - in: path
 *         name: permissionId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da permissão
 *     responses:
 *       204:
 *         description: Permissão removida do papel com sucesso
 *       404:
 *         description: Papel ou permissão não encontrado
 */
v1Router.delete('/roles/:id/permissions/:permissionId', roleController.removePermissionFromRole);

// Permission routes
/**
 * @swagger
 * /permissions:
 *   get:
 *     summary: Retorna todas as permissões
 *     tags: [Permissions]
 *     responses:
 *       200:
 *         description: Lista de permissões
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Permission'
 */
v1Router.get('/permissions', permissionController.getAllPermissions);

/**
 * @swagger
 * /permissions/{id}:
 *   get:
 *     summary: Retorna uma permissão pelo ID
 *     tags: [Permissions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da permissão
 *     responses:
 *       200:
 *         description: Detalhes da permissão
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Permission'
 *       404:
 *         description: Permissão não encontrada
 */
v1Router.get('/permissions/:id', permissionController.getPermissionById);

/**
 * @swagger
 * /permissions:
 *   post:
 *     summary: Cria uma nova permissão
 *     tags: [Permissions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PermissionInput'
 *     responses:
 *       201:
 *         description: Permissão criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Permission'
 *       400:
 *         description: Erro na requisição
 */
v1Router.post('/permissions', permissionController.createPermission);

/**
 * @swagger
 * /permissions/{id}:
 *   put:
 *     summary: Atualiza uma permissão existente
 *     tags: [Permissions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da permissão
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PermissionInput'
 *     responses:
 *       200:
 *         description: Permissão atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Permission'
 *       400:
 *         description: Erro na requisição
 *       404:
 *         description: Permissão não encontrada
 */
v1Router.put('/permissions/:id', permissionController.updatePermission);

/**
 * @swagger
 * /permissions/{id}:
 *   delete:
 *     summary: Deleta uma permissão
 *     tags: [Permissions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da permissão
 *     responses:
 *       204:
 *         description: Permissão deletada com sucesso
 *       404:
 *         description: Permissão não encontrada
 */
v1Router.delete('/permissions/:id', permissionController.deletePermission);

/**
 * @swagger
 * /permissions/resource/{resource}:
 *   get:
 *     summary: Retorna permissões por recurso
 *     tags: [Permissions]
 *     parameters:
 *       - in: path
 *         name: resource
 *         schema:
 *           type: string
 *           enum: [users, pets, shelters, adoptions, tags, images, roles, permissions, logs]
 *         required: true
 *         description: Recurso das permissões
 *     responses:
 *       200:
 *         description: Lista de permissões do recurso especificado
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Permission'
 */
v1Router.get('/permissions/resource/:resource', permissionController.getPermissionsByResource);

/**
 * @swagger
 * /permissions/action/{action}:
 *   get:
 *     summary: Retorna permissões por ação
 *     tags: [Permissions]
 *     parameters:
 *       - in: path
 *         name: action
 *         schema:
 *           type: string
 *           enum: [create, read, update, delete, manage]
 *         required: true
 *         description: Ação das permissões
 *     responses:
 *       200:
 *         description: Lista de permissões da ação especificada
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Permission'
 */
v1Router.get('/permissions/action/:action', permissionController.getPermissionsByAction);

/**
 * @swagger
 * /tags/stats/usage:
 *   get:
 *     summary: Retorna estatísticas de uso das tags
 *     tags: [Tags]
 *     responses:
 *       200:
 *         description: Estatísticas de uso das tags
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 allOf:
 *                   - $ref: '#/components/schemas/Tag'
 *                   - type: object
 *                     properties:
 *                       usageCount:
 *                         type: integer
 *                         description: Número de vezes que a tag foi usada
 */
v1Router.get('/tags/stats/usage', tagController.getTagUsageStats);

// Mount v1 routes
router.use('/v1', v1Router);

// Error handling
router.use(notFoundHandler);
router.use(errorHandler);

export default router;