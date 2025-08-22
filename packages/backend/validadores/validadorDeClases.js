import Pedido from "../models/entities/pedido";

export const isPedido = (pedido) => {
  return pedido instanceof Pedido;
};
