import { PedidoModel } from '../schemas/pedidoSchema.js';

class PedidoRepository {
  constructor() {
    this.model = PedidoModel;
  }

  async save(pedido) {
    const nuevoPedido = new this.model(pedido);
    return await nuevoPedido.save();
  }

  async findById(id) {
    return await this.model.findById(id).populate('comprador').populate('items.producto');
  }

  async findAllByCompradorId(usuarioId, skip, elementosPorPagina) {
    return await this.model
      .find({ comprador: usuarioId })
      .skip(skip)
      .limit(elementosPorPagina)
      .populate('comprador')
      .populate('items.producto')
      .populate('historialEstados.usuario');
  }

  async findAllByVendedorId(usuarioId, skip, elementosPorPagina) {
    return await this.model
      .find({ vendedor: usuarioId })
      .skip(skip)
      .limit(elementosPorPagina)
      .populate('vendedor')
      .populate('items.producto')
      .populate('historialEstados.usuario');
  }

  async update(id, pedidoModificado) {
    return this.model
      .findByIdAndUpdate(id, pedidoModificado, { new: true })
      .populate('comprador')
      .populate('items.producto')
      .populate('historialEstados.usuario');
  }

  async findByProduct(producto) {
    return await this.model.find({ 'items.producto': producto });
  }

  async count() {
    return await this.model.countDocuments();
  }

  async countByVendedorId(vendedor) {
    return await this.model.countDocuments({ vendedor: vendedor });
  }

  async countByCompradorId(comprador) {
    return await this.model.countDocuments({ comprador: comprador });
  }
}

export default PedidoRepository;
