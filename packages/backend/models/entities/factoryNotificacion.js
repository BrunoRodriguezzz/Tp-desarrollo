import EstadoPedido from "../enums/estadoPedido";
import Pedido from "./pedidos";
import Notificacion from "./notificacion";

export default class FactoryNotificacion{
    crearSegunEstadoPedido(estado){
        if(!(Object.values(EstadoPedido).includes(estado))){
            throw new Error('El estado del pedido no corresponde con un objeto de su clase');
        }

        const mensaje = `El pedido se encuentra en estado ${EstadoPedido.estado}`;

        return mensaje;
    }

    crearSegunPedido(pedido){
        if(!(pedido instanceof Pedido)){
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