class UsuarioRepository {
  constructor() {
    this.usuarios = [];
  }

  findById(id) {
    return this.usuarios.find(u => u.id === id) || null;
  }
}

export default UsuarioRepository;
