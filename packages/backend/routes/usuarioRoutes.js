import express from 'express';
import UsuarioController from '../controllers/usuarioController.js';
import loggerMiddleware from '../middlewares/loggerMiddleware.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const pathUsuarios = '/usuarios';

export default function usuarioRoutes(getController) {
  const router = express.Router();
  router.use(loggerMiddleware);

  // POST /usuarios
  router.post(pathUsuarios, async (req, res, next) => {
    try {
      await getController(UsuarioController).signup(req, res);
    } catch (error) {
      next(error);
    }
  });

  // POST /usuarios/login
  router.post(pathUsuarios + '/login', async (req, res, next) => {
    try {
      await getController(UsuarioController).login(req, res);
    } catch (error) {
      next(error);
    }
  });

  // POST /usuarios/refresh (pública: se valida el refresh token en el controlador)
  router.post(pathUsuarios + '/refresh', async (req, res, next) => {
    try {
      await getController(UsuarioController).refreshToken(req, res);
    } catch (error) {
      next(error);
    }
  });

  return router;
}
