import express from 'express';
import PedidoController from '../controllers/pedidoController.js';

const pathPedidos = '/pedidos';

export default function pedidoRoutes(getController) {
  const router = express.Router();

  // POST /pedidos - Crear un nuevo pedido
  router.post(pathPedidos, (req, res) => getController(PedidoController).create(req, res));

  // POST /pedidos/:id/cancelacion - Cancelar un pedido por ID
  router.post(pathPedidos + '/:id/cancelacion', (req, res) =>
    getController(PedidoController).cancel(req, res)
  );

  // GET /pedidos/usuarios/:id - Obtener el historial de pedidos de un usuario por ID
  router.get(pathPedidos + '/usuarios/:id', (req, res) =>
    getController(PedidoController).getHistoryUser(req, res)
  );

  // POST /pedidos/:id/envio - Marcar un pedido como enviado por ID
  router.post(pathPedidos + '/:id/envio', (req, res) =>
    getController(PedidoController).marcarEnvio(req, res)
  );

  // GET /pedidos/productos/:id - Obtener todos los pedidos que incluyen un producto específico por ID
  router.get(pathPedidos + '/productos/:id', (req, res) =>
    getController(PedidoController).findByProduct(req, res)
  );

  return router;
}
