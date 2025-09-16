import express from "express";
import PedidoController from "../controllers/pedidoController.js";

const pathPedidos = "/pedidos";

export default function healtCheckRoute(getController) {
  const router = express.Router();

  router.post(pathPedidos, (req, res) =>
    getController(PedidoController).create(req, res)
  );

  router.post(pathPedidos + "/:id/cancelacion", (req, res) =>
    getController(PedidoController).cancel(req, res)
  );

  router.get(pathPedidos + "/usuarios/:id", (req, res) =>
    getController(PedidoController).getHistoryUser(req, res)
  );

  router.post(pathPedidos + "/:id/envio", (req, res) =>
    getController(PedidoController).marcarEnvio(req, res)
  );

  return router;
}
