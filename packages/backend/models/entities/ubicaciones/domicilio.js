import { isString } from "../../../validadores/validadorTiposNativos";
import { ValidationError } from "../../../errors/tiendaSolError";
class Domicilio {
  calle;
  altura;
  piso;
  departamento;
  codigoPostal;

  constructor(calle, altura) {
    this.validarCalleYAltura(calle, altura);

    this.calle = calle;
    this.altura = altura;
  }

  setPiso(piso) {
    if (!isString(piso)) {
      throw new ValidationError("El piso debe ser una cadena");
    }
    this.piso = piso;
  }

  setDepartamento(departamento) {
    if (!isString(departamento)) {
      throw new ValidationError("El departamento debe ser una cadena");
    }
    this.departamento = departamento;
  }

  setCodigoPostal(codigoPostal) {
    if (!isString(codigoPostal)) {
      throw new ValidationError("El codigo postal debe ser una cadena");
    }
    this.codigoPostal = codigoPostal;
  }

  validarCalleYAltura(calle, altura) {
    if (!isString(calle)) {
      throw new ValidationError("La calle debe ser una cadena");
    }
    if (!isString(altura)) {
      throw new ValidationError("La altura debe ser una cadena");
    }
  }
}

export default Domicilio;
