import Notificacion from './notificacion.js';
import { parseJSON } from '../../../utils/jsonReader.js';
import { interpolarMensaje } from '../../../utils/stringInterpolator.js';
import { isPedido } from '../../../validadores/validadorDeClases.js';
import { isEstadoPedido } from '../../../validadores/validadorDeEnums.js';
import EstadoPedido from '../../enums/estadoPedido.js';
import { ValidationError } from '../../../errors/tiendaSolError.js';
import { no } from 'zod/locales';

export default class FactoryNotificacion {
  constructor(lang = 'es') {
    this.lang = lang;
    this.mensajeSegunEstado = this.cargarMensajes();
  }

  crearSegunPedido(pedido) {
    isPedido(pedido);

    const { estado, comprador } = pedido;
    const vendedor = pedido.getVendedor();
    const mensajeBase = this.crearSegunEstadoPedido(estado);
    const variables = this.crearVariablesMensaje(pedido);

    const notificaciones = [];
    let usuarioDestino;

    if (estado === EstadoPedido.CANCELADO) {
      usuarioDestino = vendedor;
    } else if (estado === EstadoPedido.ENVIADO) {
      usuarioDestino = comprador;
    } else if (estado === EstadoPedido.PENDIENTE) {
      usuarioDestino = vendedor;

      const mensajeComprador = interpolarMensaje(
        this.mensajeSegunEstado[EstadoPedido.PENDIENTE + '_COMPRADOR'],
        variables
      );
      notificaciones.push(new Notificacion(comprador, mensajeComprador, new Date()));
    } else {
      return;
    }

    const mensajeFinal = interpolarMensaje(mensajeBase, variables);
    notificaciones.push(new Notificacion(usuarioDestino, mensajeFinal, new Date()));

    return notificaciones;
  }

  crearSegunEstadoPedido(estado) {
    if (!isEstadoPedido(estado)) {
      throw new ValidationError('El estado del pedido no corresponde con un objeto de su clase');
    }

    return this.mensajeSegunEstado[estado];
  }

  crearVariablesMensaje(pedido) {
    return {
      id: pedido.id,
      nombreComprador: pedido.comprador.nombre,
      total: pedido.total,
      items: pedido.items.map(item => `- ${item.cantidad} x ${item.producto.titulo}`).join('\n'),
      calle: pedido.direccion.domicilio.calle,
      altura: pedido.direccion.domicilio.altura,
      piso: pedido.direccion.domicilio.piso,
      departamento: pedido.direccion.domicilio.departamento,
      codigoPostal: pedido.direccion.domicilio.codigoPostal,
      ciudad: pedido.direccion.ciudad.nombre,
      provincia: pedido.direccion.ciudad.provincia.nombre,
      pais: pedido.direccion.ciudad.provincia.pais.nombre,
    };
  }

  cargarMensajes() {
    const encontrado = parseJSON('../lang/mensajes.json').find(m => m.lang === this.lang);

    if (!encontrado) {
      throw new ValidationError(`No se encontraron mensajes para el idioma ${this.lang}`);
    }

    return encontrado.mensajes;
  }
}
