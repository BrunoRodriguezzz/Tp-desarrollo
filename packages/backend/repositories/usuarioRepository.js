import { UsuarioModel } from "../schemas/usuarioSchema.js";

class UsuarioRepository {
  constructor() {
    this.model = UsuarioModel;
  }

  async findAll() {
    return await this.model.find();
  }

  async findById(id) {
    return await this.model.findById(id);
  }
}

export default UsuarioRepository;
