import EstadoPedido from "../models/enums/estadoPedido.js";
import { isMoneda } from "./validadorDeEnums.js";
import { isNumber } from "./validadorTiposNativos.js";

export function validar(comprador, moneda, direccion) {
  if (comprador == null || !(comprador instanceof Usuario)) {
    throw new Error("Comprador inválido");
  }

  if (!isMoneda(moneda)) {
    throw new Error("Moneda inválido");
  }

  if (direccion == null || !(direccion instanceof DireccionEntrega)) {
    throw new Error("Comprador inválido");
  }
}

export function validarComprador(comprador, compradorId) {
  if (!comprador) {
    throw new NotFoundError(`Comprador ${compradorId} no encontrado`);
  }
  if (comprador.tipo !== TipoUsuario.COMPRADOR) {
    throw new ConflictError(
      `El usuario ${comprador.id} no es un comprador válido`
    );
  }
}

export function validarVendedor(vendedor, vendedorId) {
  if (!vendedor) {
    throw new NotFoundError(`Vendedor ${vendedorId} no encontrado`);
  }
  if (vendedor.tipo !== TipoUsuario.VENDEDOR) {
    throw new ConflictError(
      `El usuario ${vendedor.id} no es un vendedor válido`
    );
  }
}

export function validarItemProducto(producto, item) {
  if (!producto) {
    throw new NotFoundError(`Producto ${item.productoId} no encontrado`);
  }
  if (item.validarStock()) {
    throw new ConflictError(`Stock insuficiente para ${producto.nombre}`);
  }
}

export function validarPedido(pedido, pedidoId) {
  if (!pedido) {
    throw new NotFoundError(`Pedido ${pedidoId} no encontrado`);
  }
}

export function validarEstadoParaCancelar(pedido) {
  if (
    pedido.estado == EstadoPedido.ENVIADO ||
    pedido.estado == EstadoPedido.ENTREGADO
  ) {
    throw new ConflictError(
      `El pedido con id ${pedido.id} no puede cancelarse porque está en estado ${pedido.estado}`
    );
  }
}

export function validarEstadoParaEnviar(pedido) {
  if (
    pedido.estado == EstadoPedido.ENTREGADO ||
    pedido.estado == EstadoPedido.CANCELADO
  ) {
    throw new ConflictError(
      `El pedido con id ${pedido.id} no puede cancelarse porque está en estado ${pedido.estado}`
    );
  }
}

export function validarDireccion(direccion) {
  const { coordenada } = direccion;
  if (
    !isNumber(coordenada.latitud) ||
    !isNumber(coordenada.longitud) ||
    coordenada.latitud < -90 ||
    coordenada.latitud > 90 ||
    coordenada.longitud < -180 ||
    coordenada.longitud > 180
  ) {
    throw new ValidationError("Coordenadas inválidas");
  }
}

export function validarCreacionPedido(compradorId, moneda, direccion, items) {
  if (!compradorId || !moneda || !direccion || !items) {
    throw new ValidationError("Todos los campos son requeridos");
  }
}

export function validarCancelacionPedido(compradorId, pedidoId, motivo) {
  if (!compradorId || !pedidoId || !motivo) {
    throw new ValidationError("Todos los campos son requeridos");
  }
}
