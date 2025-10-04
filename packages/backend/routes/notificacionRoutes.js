import express from "express";
import NotificacionController from "../controllers/notificacionController.js";

const pathNotificaciones = "/notificaciones";

export default function notificacionRoute(getController) {
  const router = express.Router();

  // /notificaciones?leida=false?userId=123
  router.get(pathNotificaciones, (req, res) =>
    getController(NotificacionController).findAll(req, res)
  );

  router.post(pathNotificaciones, (req, res) =>
    getController(NotificacionController).crear(req, res)
  );

  // /notificaciones/12/leida
  router.patch(pathNotificaciones + "/:id" + "/leida", (req, res) =>
    getController(NotificacionController).marcarComoLeida(req, res)
  );

  return router;
}
