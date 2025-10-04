export default class PedidoRepository {
  constructor(pedidos) {
    this.pedidos = pedidos;
  }

  findById(id) {
    return this.pedidos.find((pedido) => pedido.id === id);
  }
}
