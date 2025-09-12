import express from "express";
import HealthController from "../controllers/healthController.js";

export default function healthRoute(getController) {
  const router = express.Router();

  router.get("/health", (req, res) =>
    getController(HealthController).health(req, res)
  );

  return router;
}
