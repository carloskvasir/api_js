import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize.js';

/**
 * @swagger
 * components:
 *   schemas:
 *     Image:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID da imagem.
 *           example: 1
 *         petId:
 *           type: integer
 *           description: ID do pet ao qual a imagem pertence.
 *           example: 1
 *         url:
 *           type: string
 *           description: URL da imagem do pet.
 *           example: "https://example.com/images/pet1.jpg"
 *         createdAt:
 *           type: string
 *           description: Data de criação do registro.
 *     ImageInput:
 *       type: object
 *       required:
 *         - petId
 *         - url
 *       properties:
 *         petId:
 *           type: integer
 *           description: ID do pet ao qual a imagem pertence.
 *           example: 2
 *         url:
 *           type: string
 *           description: URL da imagem do pet.
 *           example: "https://example.com/images/pet2.jpg"
 */

class Image extends Model {}

Image.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  petId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'URL da imagem do pet'
  }
}, {
  sequelize,
  modelName: 'Image',
  timestamps: true,
  updatedAt: false  // Apenas createdAt, sem updatedAt
});

export default Image;
