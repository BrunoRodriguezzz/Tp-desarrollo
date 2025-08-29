import { isString } from "../../validadores/validadorTiposNativos";

class Categoria {
  nombre;

  constructor(nombre) {
    if (isString(nombre)) {
      throw new Error(
        "El nombre ingresado no corresponde a un dato de tipo string"
      );
    }
    this.nombre = nombre;
  }
}

export default Categoria;