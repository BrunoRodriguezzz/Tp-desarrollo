import FactoryNotificacion from "../models/entities/notificacion/factoryNotificacion.js";

export default class NotificacionService {
  constructor(notificacionRepository, pedidoRepository, usuarioRepository) {
    this.notificacionRepository = notificacionRepository;
    this.pedidoRepository = pedidoRepository;
    this.usuarioRepository = usuarioRepository;
    this.factory = new FactoryNotificacion();
  }

  async findAll() {
    return await this.notificacionRepository.findAll();
  }

  async findAllUser(userId) {
    return await this.notificacionRepository.findAllByUserId(userId);
  }

  async findAllLeidas(userId) {
    return await this.notificacionRepository.findAllLeidas(userId);
  }

  async findAllNoLeidas(userId) {
    return await this.notificacionRepository.findAllNoLeidas(userId);
  }

  async marcarComoLeida(id) {
    const notificacion = await this.notificacionRepository.findById(id);
    if (!notificacion) return null;

    notificacion.leida = true;

    await this.notificacionRepository.marcarComoLeida(notificacion);
    return notificacion;
  }

  async crearSegunPedido(pedidoId) {
    const pedido = await this.pedidoRepository.findById(pedidoId);

    if (!pedido) {
      throw new Error(`No se encontró el pedido con id ${pedidoId}`);
    }

    const notificacion = this.factory.crearSegunPedido(pedido);

    if (!notificacion) {
      throw new Error(
        `No se pudo generar la notificación para el pedido con id ${pedidoId}`
      );
    }

    return await this.repo.save(notificacion);
  }
}
