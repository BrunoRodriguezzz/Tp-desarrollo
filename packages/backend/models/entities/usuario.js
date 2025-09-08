import { esNoNuloNiUndefined } from "../../validadores/validador.js";

class Usuario {
  id;
  nombre;
  email;
  telefono;
  tipo;
  fechaAlta;

  constructor(nombre, tipo, email, telefono) {
    esNoNuloNiUndefined(
      this.constructor.name,
      nombre,
      tipo,
      email,
      telefono
    );
    this.nombre = nombre;
    this.tipo = tipo;
    this.email = email;
    this.telefono = telefono;
    this.fechaAlta = new Date();
  }
}

export default Usuario;
