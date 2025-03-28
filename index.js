const express = require('express');
const { Client } = require('pg');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Configurações do PostgreSQL
const dbConfig = {
  user: 'db_user',
  host: 'localhost',
  database: 'db_name',
  password: 'db_pass',
  port: 5432,
};

// Configurações do MongoDB
const mongoUri = 'mongodb://mongo_user:mongo_pass@mongo:27017/mongo_db_name';

// Rota /hello
app.get('/hello', async (req, res) => {
  const pgClient = new Client(dbConfig);
  const mongoClient = new MongoClient(mongoUri);

  try {
    // Conectar ao PostgreSQL e obter a versão
    await pgClient.connect();
    const pgResult = await pgClient.query('SELECT version();');
    const pgVersion = pgResult.rows[0].version;

    // Conectar ao MongoDB e obter a versão
    await mongoClient.connect();
    const adminDb = mongoClient.db().admin();
    const mongoInfo = await adminDb.serverStatus();
    const mongoVersion = mongoInfo.version;

    res.json({
      message: "Welcome to @caloskvasir Express API!",
      postgres_version: pgVersion,
      mongodb_version: mongoVersion,
    });
  } catch (err) {
    console.error('Erro ao conectar aos bancos de dados:', err);
    res.status(500).json({ error: 'Erro interno do servidor' });
  } finally {
    await pgClient.end();
    await mongoClient.close();
  }
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
