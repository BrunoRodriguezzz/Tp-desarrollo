import { isString } from "../../../validadores/validadorTiposNativos";

class Provincia {
  nombre;
  pais;

  constructor(nombre, pais) {
    this.validar(nombre);
    this.nombre = nombre;
    this.pais = pais;
  }

  validar(nombre) {
    if (!isString(nombre)) {
      throw new ValidationError("El nombre del pais debe ser una cadena");
    }
  }
}

export default Provincia;
