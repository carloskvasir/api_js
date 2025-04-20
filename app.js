import express from 'express';
import { engine } from 'express-handlebars';
import { errorHandler } from './middleware/errorHandler.js';
import apiRouter from './routes/api.js';
import webRouter from './routes/web.js';

const app = express();

// Configuração do Handlebars
app.engine('handlebars', engine());
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
