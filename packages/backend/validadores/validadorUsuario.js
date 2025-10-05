export function validarUsuario(usuario, usuarioId) {
  if (!usuario) {
    throw new NotFoundError(`Usuario ${usuarioId} no encontrado`);
  }
}
