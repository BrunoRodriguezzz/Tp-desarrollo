import Producto from "../models/entities/producto.js";
import filtarPorPrecio from "../models/filters/priceFilter.js";

//! ESTO ES UNICAMENTE PARA PROBAR LA API
import Usuario from "../models/entities/usuario.js";
const usuario = new Usuario(0, "nombre", "tipo", "email", "telefono");
const producto1 = new Producto(usuario, "Producto 1");
const producto2 = new Producto(usuario, "Producto 2");
const producto3 = new Producto(usuario, "Producto 3");
const producto4 = new Producto(usuario, "Producto 4");
const producto5 = new Producto(usuario, "Producto 5");
const producto6 = new Producto(usuario, "Producto 6");
const producto7 = new Producto(usuario, "Producto 7");
const producto8 = new Producto(usuario, "Producto 8");
const producto9 = new Producto(usuario, "Producto 9");
const producto10 = new Producto(usuario, "Producto 10");
producto1.setPrecio(100);
producto2.setPrecio(100);
producto3.setPrecio(100);
producto4.setPrecio(200);
producto5.setPrecio(200);
producto6.setPrecio(200);
producto7.setPrecio(300);
producto8.setPrecio(300);
producto9.setPrecio(300);
producto10.setPrecio(400);

export default class ProductoRepository {
  constructor() {
    this.productos = [
      producto1,
      producto2,
      producto3,
      producto4,
      producto5,
      producto6,
      producto7,
      producto8,
      producto9,
      producto10,
    ];
    this.nextId = 1;
  }

  findAll(filtros = {}) {
    const { maxPrice, minPrice } = filtros;
    let productosADevolver = this.productos;

    if (maxPrice || minPrice) {
      productosADevolver = filtarPorPrecio(
        productosADevolver,
        maxPrice,
        minPrice
      );
    }

    return productosADevolver;
  }

  findByPage(numeroPagina, elementosPorPagina, filtros) {
    const offset = (numeroPagina - 1) * elementosPorPagina;
    const productos = this.findAll(filtros);

    return productos.slice(offset, offset + elementosPorPagina);
  }

  countAll() {
    return this.productos.length;
  }
}
