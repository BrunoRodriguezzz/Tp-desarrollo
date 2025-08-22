import { validar } from "../../../validadores/validadoresProducto";

class Builder {
    constructor(ProductoClass, id, vendedor, titulo) {
        this.ProductoClass = ProductoClass;
        validar(vendedor, titulo, id);
        this.id = id;
        this.vendedor = vendedor;
        this.titulo = titulo;
    }

    descripcion(descripcion) {
        this.descripcion = descripcion;
        return this;
    }

    categorias(categorias) {
        this.categorias = categorias;
        return this;
    }

    precio(precio) {
        this.precio = precio;
        return this;
    }

    moneda(moneda) {
        this.moneda = moneda;
        return this;
    }

    stock(stock) {
        this.stock = stock;
        return this;
    }

    fotos(fotos) {
        this.fotos = fotos;
        return this;
    }

    activo(activo) {
        this.activo = activo;
        return this;
    }

    build() {
        return new this.ProductoClass(this);
    }
}

export { Builder };