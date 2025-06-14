import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize.js';
import UserModel from './User.js';

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
      model: UserModel,
      key: 'id'
    }
  }
}, {
  sequelize
});

/**
 * @swagger
 * components:
 *   schemas:
 *     Shelter:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID do abrigo.
 *           example: 1
 *         name:
 *           type: string
 *           description: Nome do abrigo.
 *           example: "Abrigo Animal Feliz"
 *         address:
 *           type: string
 *           description: Endereço do abrigo.
 *           example: "Rua Exemplo, 123, Cidade, Estado"
 *         phone:
 *           type: string
 *           description: Telefone do abrigo.
 *           example: "(11) 99999-9999"
 *         email:
 *           type: string
 *           format: email
 *           description: Email de contato do abrigo.
 *           example: "contato@abrigofeliz.com"
 *         description:
 *           type: string
 *           description: Descrição do abrigo.
 *           example: "Abrigo dedicado ao resgate e adoção de animais."
 *         userId:
 *           type: integer
 *           description: ID do usuário responsável pelo abrigo.
 *           example: 1
 *         createdAt:
 *           type: string
 *           description: Data de criação do registro.
 *         updatedAt:
 *           type: string
 *           description: Data da última atualização do registro.
 *     ShelterInput:
 *       type: object
 *       required:
 *         - name
 *         - address
 *         - phone
 *         - email
 *         - userId
 *       properties:
 *         name:
 *           type: string
 *           description: Nome do abrigo.
 *           example: "Abrigo Patinhas Carentes"
 *         address:
 *           type: string
 *           description: Endereço do abrigo.
 *           example: "Avenida Principal, 456, Outra Cidade, Estado"
 *         phone:
 *           type: string
 *           description: Telefone do abrigo.
 *           example: "(21) 88888-8888"
 *         email:
 *           type: string
 *           format: email
 *           description: Email de contato do abrigo.
 *           example: "contato@patinhascarentes.com"
 *         description:
 *           type: string
 *           description: Descrição do abrigo.
 *           example: "Focados em cães e gatos idosos."
 *         userId:
 *           type: integer
 *           description: ID do usuário responsável pelo abrigo.
 *           example: 2
 */

export default Shelter;