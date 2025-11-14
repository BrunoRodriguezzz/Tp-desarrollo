import { ConflictError, NotFoundError, ValidationError } from '../errors/tiendaSolError.js';
import EstadoPedido from '../models/enums/estadoPedido.js';
import { isMoneda } from './validadorDeEnums.js';
import { isNumber } from './validadorTiposNativos.js';
import TipoUsuario from '../models/enums/tipoUsuario.js';
import Usuario from '../models/entities/usuario.js';
import DireccionEntrega from '../models/entities/ubicaciones/direccionEntrega.js';

export function validar(comprador, moneda, direccion) {
  if (
    comprador == null ||
    (!(comprador instanceof Usuario) &&
      !(typeof comprador === 'object' && comprador.nombre && comprador.tipo))
  ) {
    throw new ValidationError('Comprador inválido');
  }

  if (!isMoneda(moneda)) {
    throw new ValidationError('Moneda inválido');
  }

  if (direccion == null || !(direccion instanceof DireccionEntrega)) {
    throw new ValidationError('Direccion inválida');
  }
}

export function validarComprador(comprador, compradorId) {
  if (!comprador) {
    throw new NotFoundError(`Comprador ${compradorId} no encontrado`);
  }
  if (comprador.tipo === TipoUsuario.COMPRADOR) {
    return true;
    // throw new ConflictError(
    //   `El usuario ${comprador.id} no es un comprador válido, es ${comprador.tipo}`
    // );
  }
}

export function validarVendedor(vendedor, vendedorId) {
  if (!vendedor) {
    throw new NotFoundError(`Vendedor ${vendedorId} no encontrado`);
  }
  if (vendedor.tipo !== TipoUsuario.VENDEDOR) {
    throw new ConflictError(`El usuario ${vendedor.id} no es un vendedor válido`);
  }
}

export function validarVendedorAutorizado(pedido, vendedorId) {
  if (!pedido.items || pedido.items.length === 0) {
    throw new ValidationError('El pedido no tiene items');
  }

  const item = pedido.items[0];
  if (!item.producto || !item.producto.vendedor) {
    throw new ValidationError('Los productos no tienen vendedor asignado');
  }

  const vendedorProducto = item.producto.vendedor;
  const vendedorIdProducto = vendedorProducto?._id?.toString() || vendedorProducto?.toString();

  if (vendedorIdProducto !== vendedorId.toString()) {
    throw new ValidationError(
      `El vendedor del pedido ${vendedorIdProducto} no coincide con el vendedor del producto ${vendedorId}`
    );
  }
}

export function validarProducto(producto, productoId) {
  if (!producto) {
    throw new NotFoundError(`Producto ${productoId} no encontrado`);
  }
}

export function validarItemProducto(producto, item) {
  if (!producto) {
    throw new NotFoundError(`Producto ${item.productoId} no encontrado`);
  }
  if (!item.validarStock()) {
    throw new ConflictError(`Stock insuficiente para ${producto.titulo}`);
  }
}

export function validarPedido(pedido, pedidoId) {
  if (!pedido) {
    throw new NotFoundError(`Pedido ${pedidoId} no encontrado`);
  }
}

export function validarCambioEstado(pedido, proximoEstado) {
  if (pedido.estado == EstadoPedido.ENTREGADO) {
    throw new ConflictError(
      `El pedido con id ${pedido?.id} no puede cambiar de estado porque está en estado ${pedido.estado}`
    );
  }
  if (proximoEstado == EstadoPedido.CANCELADO) {
    validarEstadoParaCancelar(pedido);
  }
  if (proximoEstado == EstadoPedido.ENVIADO) {
    validarEstadoParaEnviar(pedido);
  }
}

export function validarEstadoParaCancelar(pedido) {
  if (pedido.estado == EstadoPedido.ENVIADO || pedido.estado == EstadoPedido.ENTREGADO) {
    throw new ConflictError(
      `El pedido con id ${pedido?.id} no puede cancelarse porque está en estado ${pedido.estado}`
    );
  }
}

export function validarEstadoParaEnviar(pedido) {
  if (pedido.estado == EstadoPedido.ENTREGADO || pedido.estado == EstadoPedido.CANCELADO) {
    throw new ConflictError(
      `El pedido con id ${pedido?.id} no puede enviarse porque está en estado ${pedido.estado}`
    );
  }
}

export function validarDireccion(direccion) {
  const { coordenada } = direccion;
  if (!coordenada) return;
  
  if (
    !isNumber(coordenada.latitud) ||
    !isNumber(coordenada.longitud) ||
    coordenada.latitud < -90 ||
    coordenada.latitud > 90 ||
    coordenada.longitud < -180 ||
    coordenada.longitud > 180
  ) {
    throw new ValidationError('Coordenadas inválidas');
  }
}

export function validarCreacionPedido(compradorId, moneda, direccion, items) {
  if (!compradorId || !moneda || !direccion || !items) {
    throw new ValidationError('Todos los campos son requeridos');
  }
}

export function validarCancelacionPedido(compradorId, pedidoId, motivo) {
  if (!compradorId || !pedidoId || !motivo) {
    throw new ValidationError('Todos los campos son requeridos');
  }
}
