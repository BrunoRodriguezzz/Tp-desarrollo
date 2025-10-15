import { NotFoundError } from "../errors/tiendaSolError.js";

export function validarUsuario(usuario, usuarioId) {
  if (!usuario) {
    throw new NotFoundError(`Usuario ${usuarioId} no encontrado`);
  }
}
