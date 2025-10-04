import dotenv from "dotenv";
import express from "express";
import Server from "./server/server.js";

// Importamos los controllers
import HealthController from "./controllers/healthController.js";
import ProductoController from "./controllers/productoController.js";
import NotificacionController from "./controllers/notificacionController.js";

// Importamos los Repositorios
import ProductoRepository from "./repositories/productoRepository.js";
import NotificacionRepository from "./repositories/notificacionRepository.js";

// Importamos los servicios
import ProductoService from "./services/productoService.js";
import NotificacionService from "./services/notificacionService.js";

import { errorHandler } from "./middlewares/errorHandler.js";
// Swagger docs
import swaggerDocs from "./swagger.js";
// Importamos las rutas
import routes from "./routes/routes.js";

import MongoDBClient from "./config/database.js";
import PedidoRepository from "./repositories/pedidoRepository.js";
import PedidoService from "./services/pedidoService.js";
import UsuarioRepository from "./repositories/usuarioRepository.js";
import PedidoController from "./controllers/pedidoController.js";
import UsuarioService from "./services/usuarioService.js";

// Inicializacion
const app = express();
dotenv.config({ path: "./packages/backend/.env" });

const port = process.env.SERVER_PORT || 3000;
//const port = 3000;
const server = new Server(app, port);

// Capas de Repositorio
const productoRepository = new ProductoRepository();
const notificacionRepository = new NotificacionRepository();
const pedidoRepository = new PedidoRepository();
const usuarioRepository = new usuarioRepository();

// Capas de Servicio
const usuarioService = new UsuarioService(usuarioRepository);
const productoService = new ProductoService(productoRepository);
const notificacionService = new NotificacionService(notificacionRepository);
const pedidoService = new PedidoService(
  pedidoRepository,
  usuarioService,
  productoService
);

// Capas de Controlador
const healthController = new HealthController();
const productoController = new ProductoController(productoService);
const notificacionController = new NotificacionController(notificacionService);
const pedidoController = new PedidoController(pedidoService);

// Registro de controlladores en el servidor
server.setController(HealthController, healthController);
server.setController(ProductoController, productoController);
server.setController(NotificacionController, notificacionController);
server.setController(PedidoController, pedidoController);

// Configuracion de rutas y lanzamiento
routes.forEach((route) => server.addRoute(route));

// Swagger docs
(async () => {
  await swaggerDocs(app);
})();

server.configureRoutes();
app.use(errorHandler);
server.launch();

//Conexion a la DB
MongoDBClient.connect();
