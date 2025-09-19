// import Notificacion from "../models/entities/notificacion/notificacion";

export default class NotificacionRepository {
  notificaciones;

  constructor(notificaciones) {
    this.nextId = 1;

    this.notificaciones = notificaciones;
  }

  findById(id) {
    return this.notificaciones.find((n) => n.id === id);
  }

  findAll() {
    return this.notificaciones;
  }

  findAllByUserId(userId) {
    return this.notificaciones.filter((n) => n.usuarioDestino.id === userId);
  }

  findAllLeidas(userId) {
    return this.notificaciones.filter(
      (n) => n.usuarioDestino.id === userId && n.leida
    );
  }

  findAllNoLeidas(userId) {
    return this.notificaciones.filter(
      (n) => n.usuarioDestino.id === userId && !n.leida
    );
  }

  update(notificacion) {
    const index = this.notificaciones.findIndex(
      (n) => n.id === notificacion.id
    );
    if (index !== -1) {
      this.notificaciones[index] = notificacion;
      return notificacion;
    }
    return null;
  }

  save(notificacion) {
    notificacion.id = this.nextId++;
    this.notificaciones.push(notificacion);
    return notificacion;
  }
}
