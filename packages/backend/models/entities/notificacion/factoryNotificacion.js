import Notificacion from "./notificacion.js";
import parseJSON from "../../../utils/jsonReader.js"
import interpolarMensaje from "../../../utils/stringInterpolator.js";
import { isPedido } from "../../../validadores/validadorDeClases.js";
import { isEstadoPedido } from "../../../validadores/validadorDeEnums.js";
import EstadoPedido from "../../enums/estadoPedido.js";

export default class FactoryNotificacion {
  
  constructor(lang = "es") {
    this.lang = lang;
    this.mensajeSegunEstado = this.cargarMensajes();
  }

  crearSegunPedido(pedido) {
    if (!isPedido(pedido)) {
        throw new Error("El pedido no corresponde con un objeto de su clase");
    }

    const { estado, comprador } = pedido;
    const vendedor = pedido.getVendedor();

    let usuarioDestino;
    if (estado === EstadoPedido.PENDIENTE || estado === EstadoPedido.CANCELADO) {
      usuarioDestino = vendedor;
    } 
    else if (estado === EstadoPedido.ENVIADO) {
      usuarioDestino = comprador;
    }
    else {
      return;
    }

    const mensajeBase = this.crearSegunEstadoPedido(estado);
    const variables = this.crearVariablesMensaje(pedido);
    const mensajeFinal = interpolarMensaje(mensajeBase, variables);

    return new Notificacion(
        usuarioDestino,
        mensajeFinal,
        new Date()
    );
  }

  crearSegunEstadoPedido(estado) {
    if (!isEstadoPedido(estado)) {
      throw new Error("El estado del pedido no corresponde con un objeto de su clase");
    }

    return this.mensajeSegunEstado[estado];
  }

  crearVariablesMensaje(pedido) {
    return {
      id: pedido.id,
      nombreComprador: pedido.comprador.nombre,
      total: pedido.total,
      items: pedido.items
                   .map(item => `- ${item.cantidad} x ${item.producto.titulo}`)
                   .join("\n"),
      calle: pedido.direccion.domicilio.calle,
      altura: pedido.direccion.domicilio.altura,
      piso: pedido.direccion.domicilio.piso,
      departamento: pedido.direccion.domicilio.departamento,
      codigoPostal: pedido.direccion.domicilio.codigoPostal,
      ciudad: pedido.direccion.ciudad.nombre,
      provincia: pedido.direccion.ciudad.provincia.nombre,
      pais: pedido.direccion.ciudad.provincia.pais.nombre
    };
  }

  cargarMensajes() {
    const encontrado = parseJSON("mensajes.json").find(m => m.lang === this.lang);

    if (!encontrado) {
      throw new Error(`No se encontraron mensajes para el idioma ${this.lang}`);
    }

    return encontrado.mensajes;
  }
}