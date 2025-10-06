import Pedido from "../models/entities/pedido.js";
import Categoria from "../models/entities/categoria.js";
import { ValidationError } from "../errors/tiendaSolError.js";

export function isPedido(pedido) {
  if (
    !(pedido instanceof Pedido) &&
    pedido?.constructor?.modelName !== "Pedido"
  ) {
    throw new ValidationError("No es un documento Pedido");
  }
}

export function validarCategoria(categoria) {
  if (categoria == null || !(categoria instanceof Categoria)) {
    throw new ValidationError("Categoría inválida");
  }
}
