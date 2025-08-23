import Notificacion from "./notificacion.js";
import { isPedido } from "../../validadores/validadorDeClases.js";
import { isEstadoPedido } from "../../validadores/validadorDeEnums.js";

export default class FactoryNotificacion {
  
  mensajeSegunEstado = {
    "PENDIENTE": 
      `Nuevo pedido {id} realizado por {nombreComprador}.
      Items:
      {items}
      Total: $ {total}
      Dirección de entrega: {calle} {altura}, {piso} {departamento}. CP {codigoPostal}. {ciudad}, {provincia}, {pais}.
      `,
    "ENVIADO": "Tu pedido {id} fue enviado.",
    "CANCELADO": "El pedido {id} fue cancelado por {nombreComprador}."
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

  interpolarEnMensaje(plantillaMensaje, variables) {
    return plantillaMensaje.replace(/\{(\w+)\}/g, (_, key) => variables[key] ?? "");
  }

  crearSegunPedido(pedido) {
    if (!isPedido(pedido)) {
        throw new Error("El pedido no corresponde con un objeto de su clase");
    }

    const { estado, comprador, items, id } = pedido;
    const vendedor = items[0].producto.vendedor;

    let usuarioDestino;
    if (estado === "PENDIENTE" || estado === "CANCELADO") {
      usuarioDestino = vendedor;
    } 
    else if (estado === "ENVIADO") {
      usuarioDestino = comprador;
    }
    else {
      return;
    }

    const mensajeBase = this.crearSegunEstadoPedido(estado);
    const variables = this.crearVariablesMensaje(pedido);
    const mensajeFinal = this.interpolarEnMensaje(mensajeBase, variables);

    return new Notificacion(
        id,
        usuarioDestino,
        mensajeFinal,
        new Date()
    );
  }
}