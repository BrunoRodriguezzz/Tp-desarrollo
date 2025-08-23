import Pedido from "../models/entities/pedido.js";

export const isPedido = (pedido) => {
  return pedido instanceof Pedido;
};
