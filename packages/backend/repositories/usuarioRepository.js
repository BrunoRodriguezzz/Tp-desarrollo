import { UsuarioModel } from "../schemas/usuarioSchema";

class UsuarioRepository {
  constructor() {
    this.model = UsuarioModel;
  }

  async findById(id) {
    return this.model.findById(id);
  }
}

export default UsuarioRepository;
