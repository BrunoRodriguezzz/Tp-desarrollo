class CambioEstadoPedido {
  estado;
  pedido;
  usuario;
  motivo;
  fecha;

  constructor(estado, pedido, usuario, motivo) {
    if (!isString(motivo)) {
      throw new ValidationError("El motivo debe ser una cadena");
    }

    this.fecha = new Date();
    this.estado = estado;
    this.pedido = pedido;
    this.usuario = usuario;
    this.motivo = motivo;
  }
}

export default CambioEstadoPedido;
