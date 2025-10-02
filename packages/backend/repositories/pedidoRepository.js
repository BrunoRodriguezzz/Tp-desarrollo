import { PedidoModel } from "../schemas/pedidoSchema";

class PedidoRepository {
  constructor() {
    this.model = PedidoModel;
  }

  async save(pedido) {
    const nuevoPedido = new this.model(pedido);
    return await nuevoPedido.save();
  }

  async findById(id) {
    return await this.model
      .findById(id)
      .populate("comprador")
      .populate("vendedor")
      .populate("items.producto");
  }

  async findAllByUsuarioId(usuarioId) {
    return await this.model
      .find({ comprador: usuarioId })
      .populate("comprador")
      .populate("vendedor")
      .populate("items.producto");
  }

  async update(id, pedidoModificado) {
    return this.model.findByIdAndUpdate(id, pedidoModificado, { new: true });
  }
}

export default PedidoRepository;
