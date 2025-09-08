import dotenv from "dotenv";
import express from "express";
import Server from "./server/server.js";

// Importamos los controllers
import HealthController from "./controllers/healthController.js";
import ProductoController from "./controllers/productoController.js";

// Importamos los Repositorios
import ProductoRepository from "./repositories/productoRepository.js";

// Importamos los servicios
import ProductoService from "./services/productoService.js";

import { errorHandler } from "./middlewares/errorHandler.js";
// Importamos las rutas
import routes from "./routes/routes.js";


// Inicializacion
const app = express();
dotenv.config({ path: './packages/backend/.env' });

const port = process.env.SERVER_PORT || 3000;
//const port = 3000;
const server = new Server(app, port);

// Capas de Repositorio
const productoRepository = new ProductoRepository();

// Capas de Servicio
const productoService = new ProductoService(productoRepository);

// Capas de Controlador
const healthController = new HealthController();
const productoController = new ProductoController(productoService);

// Registro de controlladores en el servidor
server.setController(HealthController, healthController);
server.setController(ProductoController, productoController);

// Configuracion de rutas y lanzamiento
routes.forEach((route) => server.addRoute(route));
server.configureRoutes();
app.use(errorHandler);
server.launch();
