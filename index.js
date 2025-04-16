import http from 'node:http';
import app from './app.js';

const PORT = 3000;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`🚀  Server ready at http://localhost:${PORT}`);
});

server.on('error', (err) => {
  console.error('❌  Unable to start server:', err);
  process.exit(1);
});

process.on('SIGINT', () => {
  console.log('\n👋  Gracefully shutting down …');
  server.close(() => process.exit(0));
});
