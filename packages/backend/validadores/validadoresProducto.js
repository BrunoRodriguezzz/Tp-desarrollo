import Usuario from "../models/entities/usuario";

export function validar(vendedor, titulo, id) {
  if (vendedor == null || !(vendedor instanceof Usuario)) {
    throw new Error("Vendedor inválido");
  }
  if (titulo == null || !(titulo instanceof String)) {
    throw new Error("Título inválido");
  }
  if (id == null || !(id instanceof String)) {
    throw new Error("ID de producto inválido");
  }
}
