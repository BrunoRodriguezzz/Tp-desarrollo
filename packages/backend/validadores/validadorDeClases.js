import Pedido from "../models/entities/pedido.js";
import Categoria from "../models/entities/categoria.js";

export const isPedido = (pedido) => {
  return pedido instanceof Pedido;
};

export function validarCategoria(categoria) {
  if (categoria == null || !(categoria instanceof Categoria)) {
    throw new Error("Categoría inválida");
  }
}
