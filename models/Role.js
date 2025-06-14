import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js';

/**
 * @swagger
 * components:
 *   schemas:
 *     Role:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID do papel.
 *           example: 1
 *         name:
 *           type: string
 *           description: Nome do papel.
 *           example: "admin"
 *         description:
 *           type: string
 *           description: Descrição do papel.
 *           example: "Administrador do sistema com acesso total."
 *         createdAt:
 *           type: string
 *           description: Data de criação do registro.
 *         updatedAt:
 *           type: string
 *           description: Data da última atualização do registro.
 *     RoleInput:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           description: Nome do papel.
 *           example: "editor"
 *         description:
 *           type: string
 *           description: Descrição do papel.
 *           example: "Usuário com permissão para editar conteúdo."
 */

const Role = sequelize.define('Role', {
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
      len: [2, 50]
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'Roles',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

export default Role;
