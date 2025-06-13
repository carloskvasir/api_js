import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize.js';

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
