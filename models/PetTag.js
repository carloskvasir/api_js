import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize.js';

class PetTag extends Model {
  // Método para obter todas as tags de um pet
  static async getTagsForPet(petId) {
    return await this.findAll({
      where: { petId },
      include: [{
        model: sequelize.models.Tag,
        where: { isActive: true }
      }],
      order: [[sequelize.models.Tag, 'name', 'ASC']]
    });
  }

  // Método para obter todos os pets com uma tag específica
  static async getPetsWithTag(tagId) {
    return await this.findAll({
      where: { tagId },
      include: [{
        model: sequelize.models.Pet,
        where: { status: 'available' }
      }],
      order: [[sequelize.models.Pet, 'name', 'ASC']]
    });
  }

  // Método para adicionar múltiplas tags a um pet
  static async addTagsToPet(petId, tagIds, addedBy = null) {
    const petTags = tagIds.map(tagId => ({
      petId,
      tagId,
      addedBy
    }));

    return await this.bulkCreate(petTags, {
      ignoreDuplicates: true // Evita erro se a relação já existir
    });
  }

  // Método para remover todas as tags de um pet
  static async removeAllTagsFromPet(petId) {
    return await this.destroy({
      where: { petId }
    });
  }
}

PetTag.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  petId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Pet',
      key: 'id'
    }
  },
  tagId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Tag',
      key: 'id'
    }
  },
  addedBy: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'User',
      key: 'id'
    }
  }
}, {
  sequelize,
  modelName: 'PetTag',
  indexes: [
    {
      unique: true,
      fields: ['petId', 'tagId']
    },
    { fields: ['petId'] },
    { fields: ['tagId'] }
  ]
});

export default PetTag;
