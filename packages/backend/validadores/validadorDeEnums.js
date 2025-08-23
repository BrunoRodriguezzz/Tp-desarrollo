import EstadoPedido from "../models/enums/estadoPedido.js";

export const isEstadoPedido = (estado) => {
  return Object.values(EstadoPedido).includes(estado);
};
