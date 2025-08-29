import { validar } from "../../../validadores/validadoresProducto.js";
import { isString, isNumber, isArray, isArrayOf } from "../../../validadores/validadorTiposNativos.js";
//import { Categoria } from "../../entities/categoria.js";

class Builder {
  constructor(ProductoClass, vendedor, titulo) {
    this.ProductoClass = ProductoClass;
    validar(vendedor, titulo);
    this.vendedor = vendedor;
    this.titulo = titulo;
  }

  descripcion(descripcion) {
    if(!isString(descripcion)) {
      throw new ValidationError("La descripción debe ser una cadena");
    }
    this.descripcion = descripcion;
    return this;
  }

  categorias(categorias) {
    // if(!isArrayOf(categorias, Categoria)) {
    //   throw new ValidationError("Las categorías deben ser un arreglo de instancias de Categoria");
    // }
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

  id(id) {
    this.id = id;
    return this;
  }

  build() {
    return new this.ProductoClass(this);
  }
}

export default Builder;
