import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize.js';
import Pet from './Pet.js';

class Image extends Model {}

Image.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  petId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Pet,
      key: 'id'
    }
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

// Define associations
Image.belongsTo(Pet, { foreignKey: 'petId' });
Pet.hasMany(Image, { foreignKey: 'petId' });

export default Image;
