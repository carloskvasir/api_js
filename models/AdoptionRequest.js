import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize.js';

class AdoptionRequest extends Model {}

AdoptionRequest.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  petId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Pets',
      key: 'id'
    }
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  status: {
    type: DataTypes.ENUM('pending', 'approved', 'rejected'),
    defaultValue: 'pending'
  },
  note: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'AdoptionRequest'
});

/**
 * @swagger
 * components:
 *   schemas:
 *     AdoptionRequest:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID da solicitação de adoção.
 *           example: 1
 *         petId:
 *           type: integer
 *           description: ID do pet solicitado.
 *           example: 1
 *         userId:
 *           type: integer
 *           description: ID do usuário solicitante.
 *           example: 1
 *         status:
 *           type: string
 *           enum: [pending, approved, rejected]
 *           description: Status da solicitação.
 *           example: "pending"
 *         note:
 *           type: string
 *           description: Observações sobre a solicitação.
 *           example: "Usuário parece ter um bom histórico."
 *         createdAt:
 *           type: string
 *           description: Data de criação do registro.
 *         updatedAt:
 *           type: string
 *           description: Data da última atualização do registro.
 *     AdoptionRequestInput:
 *       type: object
 *       required:
 *         - petId
 *         - userId
 *       properties:
 *         petId:
 *           type: integer
 *           description: ID do pet a ser adotado.
 *           example: 2
 *         userId:
 *           type: integer
 *           description: ID do usuário que está solicitando a adoção.
 *           example: 3
 *         status:
 *           type: string
 *           enum: [pending, approved, rejected]
 *           description: Status inicial da solicitação (geralmente 'pending').
 *           example: "pending"
 *         note:
 *           type: string
 *           description: Alguma nota inicial para a solicitação.
 *           example: "Interessado no pet X."
 */

export default AdoptionRequest;
