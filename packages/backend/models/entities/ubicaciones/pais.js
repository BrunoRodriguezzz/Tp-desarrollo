class Pais {
  nombre;

  constructor(nombre) {
    if (!isString(nombre)) {
      throw new ValidationError("El nombre debe ser una cadena");
    }

    this.nombre = nombre;
  }
}

export default Pais;
