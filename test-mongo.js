// Teste simples para MongoDB
import mongoose from 'mongoose';
import Log from './models/Log.js';

const mongoUri = 'mongodb://admin:admin123@localhost:27017/petmatch_logs?authSource=admin';

console.log('Tentando conectar ao MongoDB...');
console.log('URI:', mongoUri);

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  console.log('Conectado ao MongoDB com sucesso!');
  
  try {
    // Teste simples - buscar logs
    const logs = await Log.find().limit(5);
    console.log('Logs encontrados:', logs.length);
    
    // Criar um log de teste
    const testLog = new Log({
      action: 'CREATE',
      table: 'test',
      record_id: 'test-1',
      user_ip: '127.0.0.1',
      details: { message: 'Teste de conexão' }
    });
    
    await testLog.save();
    console.log('Log de teste criado com sucesso!');
    
    // Buscar novamente
    const allLogs = await Log.find();
    console.log('Total de logs após criação:', allLogs.length);
    
  } catch (error) {
    console.error('Erro na operação:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Desconectado do MongoDB');
    process.exit(0);
  }
}).catch((error) => {
  console.error('Erro na conexão:', error);
  process.exit(1);
});
