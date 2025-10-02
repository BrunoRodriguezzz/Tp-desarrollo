import {
  filtrarPorPrecio,
  filtrarPorVendedor,
  filtrarPorBusqueda,
} from "../models/filters/productFilters.js";
import { NotFoundError } from "../errors/tiendaSolError.js";
import ProductoModel from "../schemas/productoSchema.js";
import AlojamientoModel from "../schemas/productoSchema.js";

export default class ProductoRepository {
  constructor() {
    this.model = ProductoModel;
  }

  async findAll() {
    return await this.model.find({ activo: true }).exec();
  }

  async save(producto) {
    const nuevoProducto = new this.model(producto);
    let aux;
    try {
      aux = await nuevoProducto.save();
    } catch (error) {
      console.error("Error al guardar el producto:", error);
    }
    return aux;
  }

  async findAll() {
    return await this.model.find();
  }

  // create(producto) {
  //   producto.id = this.nextId++;
  //   this.productos.push(producto);
  //   return producto;
  // }

  // findAll(filtros = {}) {
  //   return this.applyFilters(this.productos, filtros);
  // }

  // findByPage(numeroPagina, elementosPorPagina, filtros) {
  //   return this.getPage(numeroPagina, elementosPorPagina, filtros, (filtros) =>
  //     this.findAll(filtros)
  //   );
  // }

  // findBySeller(numeroPagina, elementosPorPagina, filtros, vendedorId) {
  //   return this.getPage(numeroPagina, elementosPorPagina, filtros, (filtros) =>
  //     filtrarPorVendedor(this.findAll(filtros), vendedorId)
  //   );
  // }

  // getPage(numeroPagina, elementosPorPagina, filtros, func) {
  //   const offset = (numeroPagina - 1) * elementosPorPagina;
  //   const productos = func(filtros);

  //   return productos.slice(offset, offset + elementosPorPagina);
  // }

  // countAll(filtros = {}) {
  //   return this.findAll(filtros).length;
  // }

  // countBySeller(filtros = {}, vendedorId) {
  //   return filtrarPorVendedor(this.findAll(filtros), vendedorId).length;
  // }

  // applyFilters(productos, filtros) {
  //   const { maxPrice, minPrice, search } = filtros;
  //   let productosFiltrados = productos;

  //   if (maxPrice || minPrice) {
  //     productosFiltrados = filtrarPorPrecio(
  //       productosFiltrados,
  //       maxPrice,
  //       minPrice
  //     );
  //   }

  //   if (search) {
  //     productosFiltrados = filtrarPorBusqueda(productosFiltrados, search);
  //   }

  //   return productosFiltrados.filter((p) => p.activo);
  // }

  // update(id, productoModificado) {
  //   const indice = this.productos.findIndex((p) => p.id === id);
  //   if (indice === -1) {
  //     throw new NotFoundError("Producto no encontrado");
  //   }
  //   const productoActualizado = {
  //     ...this.productos[indice],
  //     ...productoModificado,
  //     id: this.productos[indice].id,
  //   };
  //   this.productos[indice] = productoActualizado;
  //   return productoActualizado;
  // }

  // findById(id) {
  //   const producto = this.productos.find((p) => p.id === id && p.activo);
  //   if (!producto) {
  //     throw new NotFoundError("Producto no encontrado");
  //   }
  //   return producto;
  // }

  // delete(id) {
  //   const producto = this.productos.find((p) => p.id === id);
  //   if (!producto) {
  //     throw new NotFoundError("Producto no encontrado");
  //   }
  //   producto.setActivo(false);
  // }
}
