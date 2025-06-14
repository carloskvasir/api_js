import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';

const RolePermission = sequelize.define('RolePermission', {
  role_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  permission_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  }
}, {
  tableName: 'RolePermissions',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

export default RolePermission;
