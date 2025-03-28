const express = require('express');
const { Client } = require('pg');

const app = express();
const PORT = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Configurações do banco de dados
const dbConfig = {
  user: 'db_user',
  host: 'localhost',
  database: 'db_name',
  password: 'db_pass',
  port: 5432,
};

// Rota raiz
app.get('/hello', async (req, res) => {
  const client = new Client(dbConfig);

  try {
    await client.connect();
    const result = await client.query('SELECT version();');
    const dbVersion = result.rows[0].version;
    res.json({
      message: "Welcome to @caloskvasir Express API!",
      db_version: dbVersion,
    });
  } catch (err) {
    console.error('Error when connecting:', err);
    res.status(500).json({ error: 'Intern error' });
  } finally {
    await client.end();
  }
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
