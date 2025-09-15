import EstadoPedido from "../models/enums/estadoPedido";
import { isMoneda } from "./validadorDeEnums";

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

export function validarComprador(comprador) {
  if (!comprador) {
    throw new NotFoundError(
      `Comprador ${nuevoPedidoJSON.compradorId} no encontrado`
    );
  }
  if (comprador.tipo !== TipoUsuario.COMPRADOR) {
    throw new ConflictError(
      `El usuario ${comprador.id} no es un comprador válido`
    );
  }
}

export function validarItemProducto(producto, item) {
  if (!producto) {
    throw new NotFoundError(`Producto ${item.productoId} no encontrado`);
  }
  if (producto.stock < item.cantidad) {
    throw new ConflictError(`Stock insuficiente para ${producto.nombre}`);
  }
}

export function validarPedido(pedido) {
  if (!pedido) {
    throw new NotFoundError(`Pedido ${pedido.id} no encontrado`);
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
