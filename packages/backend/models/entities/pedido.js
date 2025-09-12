import EstadoPedido from "../enums/estadoPedido.js";
import Moneda from "../enums/moneda.js";
import CambioEstadoPedido from "./cambioEstadoPedido.js";
import ItemPedido from "./itemPedido.js";

class Pedido {
  id;
  comprador;
  items;
  total;
  moneda;
  direccion;
  estado;
  fechaCreacion;
  historialEstados = [];
  vendedor;

  constructor(comprador, moneda, direccion) {
    this.comprador = comprador;
    this.moneda = moneda;
    this.direccion = direccion;
    this.items = [];
    this.estado = EstadoPedido.PENDIENTE;
    this.fechaCreacion = new Date();
  }

  agregarItem(item) {
    this.items.push(item);

    if (!this.vendedor) {
      this.vendedor = item.producto.vendedor;
    }
    
    this.calcularTotal();
  }

  quitarItem(item) {
    this.items = this.items.filter((i) => i !== item);
    this.calcularTotal();
  }

  calcularTotal() {
    this.total = this.items.reduce((sum, item) => sum + item.subTotal(), 0);
  }

  actualizarEstado(nuevoEstado, quien, motivo) {
    this.estado = nuevoEstado;
    this.historialEstados.push(
      new CambioEstadoPedido(nuevoEstado, this, quien, motivo)
    );
  }

  validarStock() {
    return this.items.every((item) => item.validarStock());
  }

  getVendedor() {
    return this.vendedor;
  }
}

export default Pedido;
