import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';

/**
 * @swagger
 * components:
 *   schemas:
 *     Permission:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID da permissão.
 *           example: 1
 *         name:
 *           type: string
 *           description: Nome da permissão.
 *           example: "create_pets"
 *         description:
 *           type: string
 *           description: Descrição da permissão.
 *           example: "Permite criar novos pets no sistema."
 *         resource:
 *           type: string
 *           enum: [users, pets, shelters, adoptions, tags, images, roles, permissions, logs]
 *           description: Recurso ao qual a permissão se aplica.
 *           example: "pets"
 *         action:
 *           type: string
 *           enum: [create, read, update, delete, manage]
 *           description: Ação permitida no recurso.
 *           example: "create"
 *         createdAt:
 *           type: string
 *           description: Data de criação do registro.
 *         updatedAt:
 *           type: string
 *           description: Data da última atualização do registro.
 *     PermissionInput:
 *       type: object
 *       required:
 *         - name
 *         - resource
 *         - action
 *       properties:
 *         name:
 *           type: string
 *           description: Nome da permissão.
 *           example: "update_shelters"
 *         description:
 *           type: string
 *           description: Descrição da permissão.
 *           example: "Permite atualizar informações de abrigos."
 *         resource:
 *           type: string
 *           enum: [users, pets, shelters, adoptions, tags, images, roles, permissions, logs]
 *           description: Recurso ao qual a permissão se aplica.
 *           example: "shelters"
 *         action:
 *           type: string
 *           enum: [create, read, update, delete, manage]
 *           description: Ação permitida no recurso.
 *           example: "update"
 */

const Permission = sequelize.define('Permission', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      len: [2, 100]
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  resource: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isIn: [['users', 'pets', 'shelters', 'adoptions', 'tags', 'images', 'roles', 'permissions', 'logs']]
    }
  },
  action: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isIn: [['create', 'read', 'update', 'delete', 'manage']]
    }
  }
}, {
  tableName: 'Permissions',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    {
      unique: true,
      fields: ['resource', 'action']
    }
  ]
});

export default Permission;
