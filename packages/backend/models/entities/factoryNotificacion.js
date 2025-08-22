import EstadoPedido from "../enums/estadoPedido";
import Notificacion from "./notificacion";
import { isPedido } from "../../validadores/validadorDeClases";
import { isEstadoPedido } from "../../validadores/validadorDeEnums";

export default class FactoryNotificacion {
    crearSegunEstadoPedido(estado) {
        if (!isEstadoPedido(estado)) {
            throw new Error('El estado del pedido no corresponde con un objeto de su clase');
        }
        const mensaje = `El pedido se encuentra en estado ${EstadoPedido.estado}`;
        return mensaje;
    }

    crearSegunPedido(pedido) {
        if (!isPedido(pedido)) {
            throw new Error('El pedido no corresponde con un objeto de su clase');
        }
        const id = pedido.id;
        const usuarioDestino = pedido.comprador;
        const mensaje = this.crearSegunEstadoPedido(pedido.estado);
        const fechaAlta = pedido.fechaCreacion;
        const notificacion = new Notificacion(id, usuarioDestino, mensaje, fechaAlta);
        return notificacion;
    }
}