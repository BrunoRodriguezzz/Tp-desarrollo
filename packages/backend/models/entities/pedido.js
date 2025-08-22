import EstadoPedido from '../enums/estadoPedido.js';
import Moneda from '../enums/moneda.js';

class Pedido {
    id
    comprador
    items
    total
    moneda
    direccion
    estado
    fechaCreacion
    historialEstados

    constructor(comprador, moneda, direccion, items) {
        this.comprador = comprador;
        this.moneda = moneda;
        this.direccion = direccion;
        this.items = items;

        this.calcularTotal();
        this.estado = EstadoPedido.PENDIENTE;
        this.fechaCreacion = new Date();
    }

    agregarItem(item) {
        this.items.push(item);
    }

    quitarItem(item) {
        this.items = this.items.filter(i => i !== item);
    }

    calcularTotal() {
        this.total = this.items.reduce((sum, item) =>
            sum + item.precioUnitario * item.cantidad, 0);
    }

    actualizarEstado(nuevoEstado, quien, motivo) {
        this.estado = nuevoEstado;
        this.historialEstados.push(new CambioEstadoPedido(nuevoEstado, this, quien, motivo));
    }

    validarStock() {
        return this.items.every(item => item.validarStock());
    }
}

export default Pedido;