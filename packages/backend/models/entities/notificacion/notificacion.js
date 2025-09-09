export default class Notificacion {
  id;
  usuarioDestino;
  mensaje;
  fechaAlta;
  leida = false;

  constructor(id, usuarioDestino, mensaje, fechaAlta) {
    this.id = id;
    this.usuarioDestino = usuarioDestino;
    this.mensaje = mensaje;
    this.fechaAlta = fechaAlta;
  }

  marcarComoLeida() {
    this.leida = true;
    this.fechaLeida = new Date();
  }
}
