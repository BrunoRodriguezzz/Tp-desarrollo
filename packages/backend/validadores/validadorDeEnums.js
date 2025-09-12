import EstadoPedido from "../models/enums/estadoPedido.js";
import Moneda from "../models/enums/moneda.js";
import TipoUsuario from "../models/enums/tipoUsuario.js";

export const isEstadoPedido = (estado) => {
  return Object.values(EstadoPedido).includes(estado);
};

export const isMoneda = (moneda) => {
  return Object.values(Moneda).includes(moneda);
};

export const isTipoUsuario = (tipo) => {
  return Object.values(TipoUsuario).includes(tipo);
}