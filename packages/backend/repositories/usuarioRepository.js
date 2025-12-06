import { UsuarioModel } from '../schemas/usuarioSchema.js';

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

  async findByEmail(email) {
    return await this.model.findOne({ email: email });
  }

  async create(usuario) {
    const nuevoUsuario = new this.model(usuario);
    return await nuevoUsuario.save();
  }
}

export default UsuarioRepository;
