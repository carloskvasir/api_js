import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize.js';

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
