import fs from "fs";
import path from "path";
import Notificacion from "./notificacion.js";
import { fileURLToPath } from "url";
import { isPedido } from "../../../validadores/validadorDeClases.js";
import { isEstadoPedido } from "../../../validadores/validadorDeEnums.js";

export default class FactoryNotificacion {
  
  constructor(lang = "es") {
    this.lang = lang;
    this.mensajeSegunEstado = this.cargarMensajes();
  }

  cargarMensajes() { // Pasar a un UTILS
    const filename = fileURLToPath(import.meta.url); 
    const dirname = path.dirname(filename);        
    const pathMensajes = path.join(dirname, "mensajes.json"); 
    const contenido = fs.readFileSync(pathMensajes, "utf-8");
    const listaMensajes = JSON.parse(contenido);

    const encontrado = listaMensajes.find(m => m.lang === this.lang);
    if (!encontrado) {
      throw new Error(`No se encontraron mensajes para el idioma ${this.lang}`);
    }
    return encontrado.mensajes;
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

  interpolarEnMensaje(plantillaMensaje, variables) { // Pasar a un UTILS
    return plantillaMensaje.replace(/\{(\w+)\}/g, (_, key) => variables[key] ?? "");
  }

  crearSegunPedido(pedido) {
    if (!isPedido(pedido)) {
        throw new Error("El pedido no corresponde con un objeto de su clase");
    }

    const { estado, comprador, items, id } = pedido;
    const vendedor = items[0].producto.vendedor; // El pedido ya sabe quien es el vendedor

    let usuarioDestino;
    if (estado === "PENDIENTE" || estado === "CANCELADO") {
      usuarioDestino = vendedor;
    } 
    else if (estado === "ENVIADO") { // Usar valores del enum
      usuarioDestino = comprador;
    }
    else {
      return;
    }

    // Agregar validaciones del estado del pedido
    // Mover notificacion a una carpeta lang

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