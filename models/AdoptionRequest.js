import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize.js';
import User from './User.js';
import Pet from './Pet.js';

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
      model: Pet,
      key: 'id'
    }
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
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

// Define associations
AdoptionRequest.belongsTo(User, { foreignKey: 'userId' });
AdoptionRequest.belongsTo(Pet, { foreignKey: 'petId' });
User.hasMany(AdoptionRequest, { foreignKey: 'userId' });
Pet.hasMany(AdoptionRequest, { foreignKey: 'petId' });

export default AdoptionRequest;
