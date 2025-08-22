class Domicilio {
    calle;
    altura;
    piso;
    departamento;
    codigoPostal;

    constructor(calle, altura) {
        this.calle = calle;
        this.altura = altura;
    }

    setPiso(piso) {
        this.piso = piso;
    }

    setDepartamento(departamento) {
        this.departamento = departamento;
    }

    setCodigoPostal(codigoPostal) {
        this.codigoPostal = codigoPostal;
    }
}

module.exports = { Domicilio }