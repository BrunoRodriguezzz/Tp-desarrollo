import { esNoNuloNiUndefined } from "../../validadores/validador.js";

class Usuario {
  id;
  nombre;
  email;
  telefono;
  tipo;
  fechaAlta;

  constructor(nombre, tipo, email, telefono) { // Sacar email y telefono del constructor
    esNoNuloNiUndefined(
      this.constructor.name,
      nombre,
      tipo,
      email,
      telefono
    );
    this.nombre = nombre;
    this.tipo = tipo; // Validar que sea ENUM
    this.email = email; // Validar formato email
    this.telefono = telefono; // Validar formato telefono
    this.fechaAlta = new Date();
  }
}

export default Usuario;
