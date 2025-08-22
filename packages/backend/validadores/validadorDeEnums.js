import EstadoPedido from "../models/enums/estadoPedido";

export const isEstadoPedido = (estado) => {
    return Object.values(EstadoPedido).includes(estado);
};


