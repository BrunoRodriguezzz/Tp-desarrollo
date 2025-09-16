class UsuarioRepository {
  constructor() {
    this.usuarios = [];
  }

  async findById(id) {
    return this.usuarios.find((u) => u.id === id) || null;
  }
}

export default UsuarioRepository;
