class Ciudad {
  nombre;
  provincia;

  constructor(nombre, provincia) {
    if (!isString(nombre)) {
      throw new ValidationError("El nombre debe ser una cadena");
    }

    this.nombre = nombre;
    this.provincia = provincia;
  }
}

export default Ciudad;
