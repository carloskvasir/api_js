import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';

/**
 * @swagger
 * components:
 *   schemas:
 *     Pet:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID do pet.
 *           example: 1
 *         name:
 *           type: string
 *           description: Nome do pet.
 *           example: Rex
 *         species:
 *           type: string
 *           description: Espécie do pet.
 *           example: Cachorro
 *         breed:
 *           type: string
 *           description: Raça do pet.
 *           example: Labrador
 *         age:
 *           type: integer
 *           description: Idade do pet.
 *           example: 2
 *         description:
 *           type: string
 *           description: Descrição do pet.
 *           example: Amigável e brincalhão.
 *         status:
 *           type: string
 *           enum: [available, adopted, pending]
 *           description: Status do pet.
 *           example: available
 *         shelterId:
 *           type: integer
 *           description: ID do abrigo ao qual o pet pertence.
 *           example: 1
 *         createdAt:
 *           type: string
 *           description: Data de criação do registro.
 *         updatedAt:
 *           type: string
 *           description: Data da última atualização do registro.
 *     PetInput:
 *       type: object
 *       required:
 *         - name
 *         - species
 *         - age
 *         - shelterId
 *       properties:
 *         name:
 *           type: string
 *           description: Nome do pet.
 *           example: Rex
 *         species:
 *           type: string
 *           description: Espécie do pet.
 *           example: Cachorro
 *         breed:
 *           type: string
 *           description: Raça do pet.
 *           example: Labrador
 *         age:
 *           type: integer
 *           description: Idade do pet.
 *           example: 2
 *         description:
 *           type: string
 *           description: Descrição do pet.
 *           example: Amigável e brincalhão.
 *         status:
 *           type: string
 *           enum: [available, adopted, pending]
 *           description: Status do pet.
 *           example: available
 *         shelterId:
 *           type: integer
 *           description: ID do abrigo ao qual o pet pertence.
 *           example: 1
 */
const Pet = sequelize.define('Pet', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  species: {
    type: DataTypes.STRING,
    allowNull: false
  },
  breed: {
    type: DataTypes.STRING,
    allowNull: true
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('available', 'adopted', 'pending'),
    defaultValue: 'available'
  },
  shelterId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Pet'
});

export default Pet;
