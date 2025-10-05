import { validarUsuario } from "../validadores/validadorUsuario.js";

export default class UsuarioService {
  constructor(UsuarioRepository) {
    this.usuarioRepository = UsuarioRepository;
  }

  async findById(usuarioId) {
    const usuario = await this.usuarioRepository.findById(usuarioId);
    validarUsuario(usuario, usuarioId);

    return usuario;
  }
}
