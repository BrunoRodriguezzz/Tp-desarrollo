import { isString } from "../../../validadores/validadorTiposNativos.js";

class Ciudad {
  nombre;
  provincia;

  constructor(nombre, provincia) {
    this.validar(nombre);

    this.nombre = nombre;
    this.provincia = provincia;
  }

  validar(nombre) {
    if (!isString(nombre)) {
      throw new ValidationError("El nombre de la ciudad debe ser una cadena");
    }
  }
}

export default Ciudad;
