class PedidoRepository {
  constructor() {
    this.pedidos = []; 
    this.nextId = 1;
  }

  save(pedido) {
    if (!pedido.id) {
      pedido.id = this.nextId++;
      this.pedidos.push(pedido);
    } else {
      const index = this.pedidos.findIndex(p => p.id === pedido.id);
      if (index === -1) {
        throw new Error(`Pedido con id ${pedido.id} no encontrado`);
      }
      this.pedidos[index] = pedido;
    }
    return pedido;
  }

  findById(id) {
    return this.pedidos.find(p => p.id === id) || null;
  }
}

export default PedidoRepository;
