import { isString } from "../../validadores/validadorTiposNativos.js";
import { ValidationError } from "../../errors/tiendaSolError.js";

class Categoria {
  nombre;

  constructor(nombre) {
    if (!isString(nombre)) {
      throw new ValidationError(
        "El nombre ingresado no corresponde a un dato de tipo string"
      );
    }
    this.nombre = nombre;
  }
}

export default Categoria;
