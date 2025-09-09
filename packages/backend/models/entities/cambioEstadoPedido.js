import { isString } from "../../validadores/validadorTiposNativos";

class CambioEstadoPedido {
  estado;
  pedido;
  usuario;
  motivo;
  fecha;

  constructor(estado, pedido, usuario, motivo) {
    this.validar(motivo);
    this.fecha = new Date();
    this.estado = estado;
    this.pedido = pedido;
    this.usuario = usuario;
    this.motivo = motivo;
  }

  validar(motivo) {
    if (!isString(motivo)) {
      throw new ValidationError("El motivo debe ser una cadena");
    }
  }
}

export default CambioEstadoPedido;
