// import Notificacion from "../models/entities/notificacion/notificacion";

export default class NotificacionRepository {
  notificaciones;

  constructor(notificaciones) {
    this.nextId = 1;

    this.notificaciones = notificaciones;
  }

  async findById(id) {
    return this.notificaciones.find((n) => n.id === id);
  }

  async findAll() {
    return this.notificaciones;
  }

  async findAllByUserId(userId) {
    return this.notificaciones.filter((n) => n.usuarioDestino.id === userId);
  }

  async findAllLeidas(userId) {
    return this.notificaciones.filter(
      (n) => n.usuarioDestino.id === userId && n.leida
    );
  }

  async findAllNoLeidas(userId) {
    return this.notificaciones.filter(
      (n) => n.usuarioDestino.id === userId && !n.leida
    );
  }

  async update(notificacion) {
    const index = this.notificaciones.findIndex(
      (n) => n.id === notificacion.id
    );
    if (index !== -1) {
      this.notificaciones[index] = notificacion;
      return notificacion;
    }
    return null;
  }

  async save(notificacion) {
    notificacion.id = this.nextId++;
    this.notificaciones.push(notificacion);
    return notificacion;
  }
}
