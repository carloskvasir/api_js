import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize.js';
import User from './User.js';

class Shelter extends Model {}

Shelter.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  }
}, {
  sequelize
});

// Definir associação com User
Shelter.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Shelter, { foreignKey: 'userId' });

export default Shelter;