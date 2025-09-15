import express from "express";
import PedidoController from "../controllers/pedidoController.js";

const pathPedidos = "/pedidos";

export default function healtCheckRoute(getController) {
  const router = express.Router();

  router.post(pathPedidos, (req, res) =>
    getController(PedidoController).create(req, res)
  );

  router.patch(pathPedidos + "/:id/cancelar", (req, res) =>
    getController(PedidoController).cancel(req, res)
  );

  return router;
}
