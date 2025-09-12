import express from "express";
import NotificacionController from "../controllers/notificacionController.js";

const pathNotificaciones = "/notificaciones";

export default function notificacionRoute(getController) {
  const router = express.Router();

  // /notificaciones?leida=false
  router.get(pathNotificaciones, (req, res) =>
    getController(NotificacionController).findAll(req, res)
  );

  router.get(pathNotificaciones + ":id", (req, res) =>
    getController(NotificacionController).findByID(req, res)
  );
  return router;
}
