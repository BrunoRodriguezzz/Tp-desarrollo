import dotenv from 'dotenv';
import express from 'express';
import Server from './server/server.js';
import cors from 'cors';

// Importamos los controllers
import HealthController from './controllers/healthController.js';
import ProductoController from './controllers/productoController.js';
import NotificacionController from './controllers/notificacionController.js';
import PedidoController from './controllers/pedidoController.js';
import CategoriaController from './controllers/categoriaController.js';
import UsuarioController from './controllers/usuarioController.js';
import ConversionController from './controllers/conversionController.js';

// Importamos los Repositorios
import ProductoRepository from './repositories/productoRepository.js';
import NotificacionRepository from './repositories/notificacionRepository.js';
import PedidoRepository from './repositories/pedidoRepository.js';
import UsuarioRepository from './repositories/usuarioRepository.js';
import CategoriaRepository from './repositories/categoriaRepository.js';

// Importamos los servicios
import ProductoService from './services/productoService.js';
import NotificacionService from './services/notificacionService.js';
import PedidoService from './services/pedidoService.js';
import UsuarioService from './services/usuarioService.js';
import CategoriaService from './services/categoriaService.js';
import ConversionService from './services/conversionService.js';

import { errorHandler } from './middlewares/errorHandler.js';
// Swagger docs
import swaggerDocs from './swagger.js';
// Importamos las rutas
import routes from './routes/routes.js';
import MongoDBClient from './config/database.js';
import AuthService from './services/authService.js';

// Inicializacion
const app = express();
dotenv.config({ path: './packages/backend/.env' });

const port = process.env.SERVER_PORT || 8000;
const server = new Server(app, port);

// Capas de Repositorio
const productoRepository = new ProductoRepository();
const notificacionRepository = new NotificacionRepository();
const pedidoRepository = new PedidoRepository();
const usuarioRepository = new UsuarioRepository();
const categoriaRepository = new CategoriaRepository();

// Capas de Servicio
const categoriaService = new CategoriaService(categoriaRepository);
const authService = new AuthService(usuarioRepository);
const usuarioService = new UsuarioService(usuarioRepository);
const conversionService = new ConversionService();

const productoService = new ProductoService(
  productoRepository,
  usuarioRepository,
  categoriaService
);

const notificacionService = new NotificacionService(notificacionRepository, pedidoRepository);

const pedidoService = new PedidoService(
  pedidoRepository,
  usuarioService,
  productoService,
  notificacionService
);

// Capas de Controlador
const healthController = new HealthController();
const productoController = new ProductoController(productoService);
const notificacionController = new NotificacionController(notificacionService);
const pedidoController = new PedidoController(pedidoService);
const categoriaController = new CategoriaController(categoriaService);
const usuarioController = new UsuarioController(usuarioService, authService);
const conversionController = new ConversionController(conversionService);

// Registro de controlladores en el servidor
server.setController(HealthController, healthController);
server.setController(ProductoController, productoController);
server.setController(NotificacionController, notificacionController);
server.setController(PedidoController, pedidoController);
server.setController(CategoriaController, categoriaController);
server.setController(UsuarioController, usuarioController);
server.setController(ConversionController, conversionController);

app.use(
  cors({
    // BARLA PIDE UNA DISCULPA POR ESTO
    // origin: 'https://tiendasol.syspa.es',
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Configuracion de rutas y lanzamiento
routes.forEach(route => server.addRoute(route));

// Swagger docs
(async () => {
  await swaggerDocs(app);
})();

server.configureRoutes();
app.use(errorHandler);
server.launch();

MongoDBClient.connect();
