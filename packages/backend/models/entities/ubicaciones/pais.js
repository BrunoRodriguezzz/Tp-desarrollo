import { isString } from "../../../validadores/validadorTiposNativos.js";

class Pais {
  nombre;

  constructor(nombre) {
    this.validar(nombre);

    this.nombre = nombre;
  }

  validar(nombre) {
    if (!isString(nombre)) {
      throw new ValidationError("El nombre del pais debe ser una cadena");
    }
  }
}

export default Pais;
