import { ValidationError } from "../errors/tiendaSolError.js";
import { validarUsuario } from "../validadores/validadorUsuario.js";
import Usuario from "../models/entities/usuario.js";
import bcrypt from "bcryptjs";

export default class UsuarioService {
  constructor(UsuarioRepository) {
    this.usuarioRepository = UsuarioRepository;
  }

  async findById(usuarioId) {
    const usuario = await this.usuarioRepository.findById(usuarioId);
    validarUsuario(usuario, usuarioId);

    return usuario;
  }

  async authenticate(email, password) {
    const usuario = await this.usuarioRepository.findByEmail(email);
    if (!usuario) {
      return null;
    }

    if (await bcrypt.compare(password, usuario.passwordHash)) {
      return usuario;
    } else {
      return null; 
    }
  }

  async signup(nombre, email, telefono, tipo, password) {
    const userExists = await this.usuarioRepository.findByEmail(email);
    if (userExists) {
      throw new ValidationError("El usuario con este email ya existe");
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const usuario = new Usuario(nombre, tipo);
    usuario.setEmail(email);
    usuario.setTelefono(telefono);
    usuario.setPasswordHash(passwordHash);
    return this.usuarioRepository.create(usuario);
  }
}
