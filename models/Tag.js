import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize.js';

/**
 * @swagger
 * components:
 *   schemas:
 *     Tag:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID da tag.
 *           example: 1
 *         name:
 *           type: string
 *           description: Nome da tag.
 *           example: "Amigável"
 *         description:
 *           type: string
 *           description: Descrição da tag.
 *           example: "O animal é sociável com humanos."
 *         color:
 *           type: string
 *           description: Cor da tag em formato hexadecimal.
 *           example: "#007bff"
 *         category:
 *           type: string
 *           enum: [health, behavior, physical, care, other]
 *           description: Categoria da tag.
 *           example: "behavior"
 *         isActive:
 *           type: boolean
 *           description: Indica se a tag está ativa.
 *           example: true
 *         createdAt:
 *           type: string
 *           description: Data de criação do registro.
 *         updatedAt:
 *           type: string
 *           description: Data da última atualização do registro.
 *     TagInput:
 *       type: object
 *       required:
 *         - name
 *         - category
 *       properties:
 *         name:
 *           type: string
 *           description: Nome da tag.
 *           example: "Brincalhão"
 *         description:
 *           type: string
 *           description: Descrição da tag.
 *           example: "Gosta de brincar com bolinhas."
 *         color:
 *           type: string
 *           description: Cor da tag em formato hexadecimal.
 *           example: "#28a745"
 *         category:
 *           type: string
 *           enum: [health, behavior, physical, care, other]
 *           description: Categoria da tag.
 *           example: "behavior"
 *         isActive:
 *           type: boolean
 *           description: Indica se a tag está ativa.
 *           example: true
 */

class Tag extends Model {
  // Método para obter tags por categoria
  static async getByCategory(category) {
    return await this.findAll({
      where: { 
        category,
        isActive: true 
      },
      order: [['name', 'ASC']]
    });
  }

  // Método para obter tags mais usadas
  static async getMostUsed(limit = 10) {
    return await this.findAll({
      attributes: [
        'id', 'name', 'description', 'color', 'category',
        [sequelize.fn('COUNT', sequelize.col('PetTags.tagId')), 'usageCount']
      ],
      include: [{
        model: sequelize.models.PetTag,
        attributes: [],
        required: false
      }],
      where: { isActive: true },
      group: ['Tag.id'],
      order: [[sequelize.literal('usageCount'), 'DESC']],
      limit
    });
  }
}

Tag.init({
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
      len: [2, 50],
      notEmpty: true
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  color: {
    type: DataTypes.STRING(7),
    allowNull: true,
    defaultValue: '#007bff',
    validate: {
      is: /^#[0-9A-F]{6}$/i // Validar formato hex de cor
    }
  },
  category: {
    type: DataTypes.ENUM('health', 'behavior', 'physical', 'care', 'other'),
    allowNull: false,
    defaultValue: 'other'
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
}, {
  sequelize,
  modelName: 'Tag',
  indexes: [
    { fields: ['name'] },
    { fields: ['category'] },
    { fields: ['isActive'] }
  ]
});

export default Tag;
