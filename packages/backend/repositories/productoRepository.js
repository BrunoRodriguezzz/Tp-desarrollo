import Producto from "../models/entities/producto.js";
import {
  filtrarPorPrecio,
  filtrarPorVendedor,
} from "../models/filters/productFilters.js";

//! ESTO ES UNICAMENTE PARA PROBAR LA API
import Usuario from "../models/entities/usuario.js";
const usuario1 = new Usuario("nombre", "tipo");
const usuario2 = new Usuario("nombre", "tipo");
const producto1 = new Producto(usuario1, "Producto 1");
const producto2 = new Producto(usuario1, "Producto 2");
const producto3 = new Producto(usuario1, "Producto 3");
const producto4 = new Producto(usuario1, "Producto 4");
const producto5 = new Producto(usuario1, "Producto 5");
const producto6 = new Producto(usuario2, "Producto 6");
const producto7 = new Producto(usuario2, "Producto 7");
const producto8 = new Producto(usuario2, "Producto 8");
const producto9 = new Producto(usuario2, "Producto 9");
const producto10 = new Producto(usuario2, "Producto 10");
usuario1.id = 1;
usuario2.id = 2;
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
    return this.applyFilters(this.productos, filtros);
  }

  findByPage(numeroPagina, elementosPorPagina, filtros) {
    return this.getPage(numeroPagina, elementosPorPagina, filtros, (filtros) =>
      this.findAll(filtros)
    );
  }

  findBySeller(numeroPagina, elementosPorPagina, filtros, vendedorId) {
    return this.getPage(numeroPagina, elementosPorPagina, filtros, (filtros) =>
      filtrarPorVendedor(this.findAll(filtros), vendedorId)
    );
  }

  getPage(numeroPagina, elementosPorPagina, filtros, func) {
    const offset = (numeroPagina - 1) * elementosPorPagina;
    const productos = func(filtros);

    return productos.slice(offset, offset + elementosPorPagina);
  }

  countAll(filtros = {}) {
    return this.findAll(filtros).length;
  }

  countBySeller(filtros = {}, vendedorId) {
    return filtrarPorVendedor(this.findAll(filtros), vendedorId).length;
  }

  applyFilters(productos, filtros) {
    const { maxPrice, minPrice } = filtros;
    let productosFiltrados = productos;

    if (maxPrice || minPrice) {
      productosFiltrados = filtrarPorPrecio(
        productosFiltrados,
        maxPrice,
        minPrice
      );
    }

    return productosFiltrados;
  }
}
