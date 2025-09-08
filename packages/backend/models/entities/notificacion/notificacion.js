export default class Notificacion {
  id;
  usuarioDestino;
  mensaje;
  fechaAlta;
  leida;
  
  constructor(id, usuarioDestino, mensaje, fechaAlta) {
    this.id = id;
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
