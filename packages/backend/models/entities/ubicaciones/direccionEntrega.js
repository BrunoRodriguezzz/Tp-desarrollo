class DireccionEntrega {
    domicilio;
    ciudad;
    coordenada;

    constructor(domicilio, ciudad, coordenada) {
        this.domicilio = domicilio;
        this.ciudad = ciudad;
        this.coordenada = coordenada;
    }
}

module.exports = { DireccionEntrega }