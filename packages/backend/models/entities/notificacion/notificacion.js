export default class Notificacion {
  id;
  usuarioDestino;
  mensaje;
  fechaAlta;
  leida;

  constructor(usuarioDestino, mensaje, fechaAlta) {
    this.usuarioDestino = usuarioDestino;
    this.mensaje = mensaje;
    this.fechaAlta = fechaAlta;
    this.leida = false;
  }

  marcarComoLeida() {
    this.leida = true;
    this.fechaLeida = new Date();
  }
}
