import mongoose from 'mongoose';

const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://localhost:27017/petmatch_logs';

console.log('Conectando ao MongoDB:', mongoUri.replace(/\/\/.*@/, '//***:***@')); // Log sem mostrar credenciais

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
  console.log('Conectado ao MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Erro na conexão MongoDB:', err);
});

export default mongoose;
