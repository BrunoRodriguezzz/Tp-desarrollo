import express from "express";
import NotificacionController from "../controllers/notificacionController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const pathNotificaciones = "/notificaciones";

export default function notificacionRoute(getController) {
  const router = express.Router();

  // GET /notificaciones?leida=false
  router.get(pathNotificaciones, authMiddleware, async (req, res, next) => {
    try {
      await getController(NotificacionController).findAll(req, res);
    } catch (err) {
      next(err);
    }
  });

  // PATCH /notificaciones/12/leida
  router.patch(pathNotificaciones + "/:id/leida", authMiddleware, async (req, res, next) => {
    try {
      await getController(NotificacionController).marcarComoLeida(req, res);
    } catch (err) {
      next(err);
    }
  });

  return router;
}
