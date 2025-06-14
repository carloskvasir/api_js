import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID do usuário.
 *           example: 1
 *         name:
 *           type: string
 *           description: Nome do usuário.
 *           example: "Carlos Silva"
 *         email:
 *           type: string
 *           format: email
 *           description: Email do usuário.
 *           example: "carlos.silva@example.com"
 *         phone:
 *           type: string
 *           description: Telefone do usuário.
 *           example: "(11) 98765-4321"
 *         createdAt:
 *           type: string
 *           description: Data de criação do registro.
 *         updatedAt:
 *           type: string
 *           description: Data da última atualização do registro.
 *     UserInput:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           description: Nome do usuário.
 *           example: "Ana Pereira"
 *         email:
 *           type: string
 *           format: email
 *           description: Email do usuário.
 *           example: "ana.pereira@example.com"
 *         phone:
 *           type: string
 *           description: Telefone do usuário.
 *           example: "(21) 91234-5678"
 *         password:
 *           type: string
 *           format: password
 *           description: Senha do usuário.
 *           example: "senhaSegura123"
 */

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize
});

export default User;
