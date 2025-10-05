import FactoryNotificacion from "../models/entities/notificacion/factoryNotificacion.js";
import { NotFoundError, ValidationError } from "../errors/tiendaSolError.js";

export default class NotificacionService {
  constructor(notificacionRepository, pedidoRepository) {
    this.notificacionRepository = notificacionRepository;
    this.pedidoRepository = pedidoRepository;
    this.factory = new FactoryNotificacion();
  }

  async verificarExistenciaUsuario(userId) {
    if (!(await this.usuarioRepository.findById(userId))) return null;
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
      throw new NotFoundError(`No se encontró el pedido con id ${pedidoId}`);
    }

    const notificacion = this.factory.crearSegunPedido(pedido);

    if (!notificacion) {
      throw new ValidationError(
        `No se pudo generar la notificación para el pedido con id ${pedidoId}`
      );
    }

    return await this.repo.save(notificacion);
  }
}
