import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';

const Permission = sequelize.define('Permission', {
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
      notEmpty: true,
      len: [2, 100]
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  resource: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isIn: [['users', 'pets', 'shelters', 'adoptions', 'tags', 'images', 'roles', 'permissions', 'logs']]
    }
  },
  action: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isIn: [['create', 'read', 'update', 'delete', 'manage']]
    }
  }
}, {
  tableName: 'Permissions',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    {
      unique: true,
      fields: ['resource', 'action']
    }
  ]
});

export default Permission;
