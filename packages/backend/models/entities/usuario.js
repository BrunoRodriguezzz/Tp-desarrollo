import { esNoNuloNiUndefined } from "../../validadores/validador.js";
import {
  validarEmail,
  validarTelefono,
} from "../../validadores/validadorTiposNativos.js";
import { isTipoUsuario } from "../../validadores/validadorDeEnums.js";

class Usuario {
  id;
  nombre;
  email;
  telefono;
  tipo;
  fechaAlta;

  constructor(nombre, tipo) {
    esNoNuloNiUndefined(this.constructor.name, nombre, tipo);
    isTipoUsuario(tipo);
    this.nombre = nombre;
    this.tipo = tipo;
    this.fechaAlta = new Date();
  }

  setEmail(email) {
    validarEmail(email);
    this.email = email;
  }

  setTelefono(telefono) {
    validarTelefono(telefono);
    this.telefono = telefono;
  }
}

export default Usuario;
