import { esNoNuloNiUndefined } from "../../validadores/validador";

class Usuario {
  id;
  nombre;
  email;
  telefono;
  tipo;
  fechaAlta;

  constructor(id, nombre, tipo, email, telefono) {
    esNoNuloNiUndefined(
      this.constructor.name,
      id,
      nombre,
      tipo,
      email,
      telefono
    );
    this.id = id;
    this.nombre = nombre;
    this.tipo = tipo;
    this.email = email;
    this.telefono = telefono;
    this.fechaAlta = new Date();
  }
}

export default Usuario;
