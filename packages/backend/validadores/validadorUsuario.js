import { NotFoundError, ValidationError, WrongCredentialsError } from "../errors/tiendaSolError.js";

export function validarUsuario(usuario, usuarioId) {
  if (!usuario) {
    throw new NotFoundError(`Usuario ${usuarioId} no encontrado`);
  }
}

export function validarUsuarioLogin(usuario) {
  if (!usuario) {
    throw new WrongCredentialsError("Email o contraseña incorrectos");
  }
}

export function validarPasswords(password, passwordConfirm) {
  if (password !== passwordConfirm) {
    throw new ValidationError("Las contraseñas no coinciden");
  }
}