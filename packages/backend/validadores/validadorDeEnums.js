import EstadoPedido from "../models/enums/estadoPedido.js";
import Moneda from "../models/enums/moneda.js";

export const isEstadoPedido = (estado) => {
  return Object.values(EstadoPedido).includes(estado);
};

export const isMoneda = (moneda) => {
  return Object.values(Moneda).includes(moneda);
};
