import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize.js';
import Shelter from './Shelter.js';

class Pet extends Model {}

Pet.init({
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
    allowNull: false,
    references: {
      model: Shelter,
      key: 'id'
    }
  }
}, {
  sequelize,
  modelName: 'Pet'
});

// Define associations
Pet.belongsTo(Shelter, { foreignKey: 'shelterId' });
Shelter.hasMany(Pet, { foreignKey: 'shelterId' });

export default Pet;
