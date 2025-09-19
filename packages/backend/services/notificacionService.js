import FactoryNotificacion from "../models/entities/notificacion/factoryNotificacion.js";

export default class NotificacionService {
  constructor(notificacionRepository, pedidoRepository, usuarioRepository) {
    this.notificacionRepository = notificacionRepository;
    this.pedidoRepository = pedidoRepository;
    this.usuarioRepository = usuarioRepository;
    this.factory = new FactoryNotificacion();
  }

  verificarExistenciaUsuario(userId) {
    if (!this.usuarioRepository.findById(userId)) return null;
  }

  findAll() {
    return this.notificacionRepository.findAll();
  }

  findAllUser(userId) {
    this.verificarExistenciaUsuario(userId);
    return this.notificacionRepository.findAllByUserId(userId);
  }

  findAllLeidas(userId) {
    this.verificarExistenciaUsuario(userId);
    return this.notificacionRepository.findAllLeidas(userId);
  }

  findAllNoLeidas(userId) {
    this.verificarExistenciaUsuario(userId);
    return this.notificacionRepository.findAllNoLeidas(userId);
  }

  marcarComoLeida(id) {
    const notificacion = this.notificacionRepository.findById(id);
    if (!notificacion) return null;

    notificacion.leida = true;

    this.notificacionRepository.update(notificacion);
    return notificacion;
  }

  crearSegunPedido(pedidoId) {
    const pedido = this.pedidoRepository.findById(pedidoId);

    if (!pedido) {
      throw new Error(`No se encontró el pedido con id ${pedidoId}`);
    }

    const notificacion = this.factory.crearSegunPedido(pedido);

    if (!notificacion) {
      throw new Error(
        `No se pudo generar la notificación para el pedido con id ${pedidoId}`
      );
    }

    return this.repo.save(notificacion);
  }
}
