import mongoose from 'mongoose';

/**
 * @swagger
 * components:
 *   schemas:
 *     Log:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID do log (MongoDB ObjectId).
 *           example: "60a1b2c3d4e5f6789abcdef0"
 *         action:
 *           type: string
 *           enum: [CREATE, READ, UPDATE, DELETE]
 *           description: Ação realizada.
 *           example: "CREATE"
 *         table:
 *           type: string
 *           description: Tabela/recurso afetado.
 *           example: "pets"
 *         record_id:
 *           type: string
 *           description: ID do registro afetado.
 *           example: "123"
 *         user_ip:
 *           type: string
 *           description: IP do usuário que realizou a ação.
 *           example: "192.168.1.1"
 *         user_agent:
 *           type: string
 *           description: User agent do navegador.
 *           example: "Mozilla/5.0..."
 *         details:
 *           type: object
 *           description: Detalhes adicionais da ação.
 *         timestamp:
 *           type: string
 *           format: date-time
 *           description: Timestamp da ação.
 *     LogInput:
 *       type: object
 *       required:
 *         - action
 *         - table
 *         - record_id
 *       properties:
 *         action:
 *           type: string
 *           enum: [CREATE, READ, UPDATE, DELETE]
 *           description: Ação realizada.
 *           example: "UPDATE"
 *         table:
 *           type: string
 *           description: Tabela/recurso afetado.
 *           example: "users"
 *         record_id:
 *           type: string
 *           description: ID do registro afetado.
 *           example: "456"
 *         user_ip:
 *           type: string
 *           description: IP do usuário que realizou a ação.
 *           example: "10.0.0.1"
 *         user_agent:
 *           type: string
 *           description: User agent do navegador.
 *           example: "Chrome/91.0..."
 *         details:
 *           type: object
 *           description: Detalhes adicionais da ação.
 */

const logSchema = new mongoose.Schema({
  action: {
    type: String,
    required: true,
    enum: ['CREATE', 'READ', 'UPDATE', 'DELETE']
  },
  table: {
    type: String,
    required: true
  },
  record_id: {
    type: String,
    required: true
  },
  user_ip: String,
  user_agent: String,
  details: mongoose.Schema.Types.Mixed,
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const Log = mongoose.model('Log', logSchema);
export default Log;
