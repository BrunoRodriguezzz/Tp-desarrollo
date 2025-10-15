export default class Notificacion {
  id;
  usuarioDestino;
  mensaje;
  fechaAlta;
  leida = false;

  constructor(usuarioDestino, mensaje, fechaAlta) {
    this.usuarioDestino = usuarioDestino;
    this.mensaje = mensaje;
    this.fechaAlta = fechaAlta;
  }

  marcarComoLeida() {
    this.leida = true;
    this.fechaLeida = new Date();
  }
}
