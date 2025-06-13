import express from 'express';
import { engine } from 'express-handlebars';
import { errorHandler } from './middleware/errorHandler.js';
import apiRouter from './routes/api.js';
import webRouter from './routes/web.js';

// Importar models com associações já configuradas
import './models/index.js';

const app = express();

// Configuração do Handlebars
app.engine('handlebars', engine({
  helpers: {
    eq (a, b) {
      return a === b;
    },
    gt (a, b) {
      return a > b;
    },
    lt (a, b) {
      return a < b;
    },
    'format-date'(date) {
      if (!date) return 'Data não disponível';
      const d = new Date(date);
      return d.toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  }
}));
app.set('view engine', 'handlebars');
app.set('views', './views');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Rotas
app.use('/api', apiRouter);
app.use('/', webRouter);

// Error handling should be last
app.use(errorHandler);

export default app;
