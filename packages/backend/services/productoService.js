import { parsearMoneda } from "../validadores/validadorDeEnums.js";
import Producto from "../models/entities/producto.js";
import Categoria from "../models/entities/categoria.js";
import Moneda from "../models/enums/moneda.js";
import { ValidationError } from "../errors/tiendaSolError.js";
import Usuario from "../models/entities/usuario.js";
import TipoUsuario from "../models/enums/tipoUsuario.js";
import mongoose from "mongoose";
import { paginationBuildResponse } from "../utils/pagination.js";

const usuario = new Usuario("Juan", TipoUsuario.VENDEDOR);

export default class ProductoService {
  constructor(ProductoRepository) {
    this.productoRepository = ProductoRepository;
  }

  async create(nuevoProductoJSON) {
    usuario.id = nuevoProductoJSON.vendedor;

    const nuevoProducto = new Producto(usuario, nuevoProductoJSON.titulo);

    const tipoMoneda = parsearMoneda(nuevoProductoJSON.moneda);

    const categorias = (nuevoProductoJSON.categorias || []).map(
      (nombre) => new Categoria(nombre)
    );

    nuevoProducto.setCategorias(categorias);
    nuevoProducto.setFotos(nuevoProductoJSON.fotos || []);
    nuevoProducto.setDescripcion(nuevoProductoJSON.descripcion || "");
    nuevoProducto.setPrecio(nuevoProductoJSON.precio || 0);
    nuevoProducto.setMoneda(tipoMoneda || Moneda.PESO_ARG);
    nuevoProducto.aumentarStock(nuevoProductoJSON.stock || 0);
    nuevoProducto.setActivo(true);

    const productoParaGuardar = {
      vendedor: usuario.id,
      titulo: nuevoProducto.titulo,
      descripcion: nuevoProducto.descripcion,
      categorias: nuevoProducto.categorias.map((categoria) => categoria.nombre),
      precio: nuevoProducto.precio,
      moneda: nuevoProducto.moneda,
      stock: nuevoProducto.stock,
      fotos: nuevoProducto.fotos,
      activo: nuevoProducto.activo,
    };

    const productoGuardado =
      await this.productoRepository.save(productoParaGuardar);
    return productoGuardado;
  }

  async findAll(page = 1, limit = 10, filtros = {}) {
    const paginado = await paginationBuildResponse(
      page,
      limit,
      filtros,
      (numeroPagina, elementosPorPagina, filtros) =>
        this.productoRepository.findByPage(
          numeroPagina,
          elementosPorPagina,
          filtros
        )
    );

    paginado.total = await this.productoRepository.count(filtros);
    paginado.calculateTotalPages();

    paginado.data = this.order(paginado.data, filtros);

    return paginado;
  }

  order(data, filtros) {
    const { orderBy } = filtros;

    if (orderBy) {
      switch (orderBy) {
        case "price_asc":
          data.sort((a, b) => a.precio - b.precio);
          break;
        case "price_desc":
          data.sort((a, b) => b.precio - a.precio);
          break;
        case "best_seller":
          // TODO: Esperar implementacion de persistencia de pedidos
          break;
        default:
          break;
      }
    }

    return data;
  }

  // findById(id) {
  //   return this.productoRepository.findById(id);
  // }

  // findAll(page = 1, limit = 10, filtros = {}) {
  //   const paginado = paginationBuildResponse(
  //     page,
  //     limit,
  //     filtros,
  //     (numeroPagina, elementosPorPagina, filtros) =>
  //       this.productoRepository.findByPage(
  //         numeroPagina,
  //         elementosPorPagina,
  //         filtros
  //       )
  //   );

  //   paginado.total = this.productoRepository.countAll(filtros);
  //   paginado.calculateTotalPages();

  //   paginado.data = this.order(paginado.data, filtros);

  //   return paginado;
  // }

  // findBySeller(vendedorId, page = 1, limit = 10, filtros = {}) {
  //   const paginado = paginationBuildResponse(
  //     page,
  //     limit,
  //     filtros,
  //     (numeroPagina, elementosPorPagina, filtros) =>
  //       this.productoRepository.findBySeller(
  //         numeroPagina,
  //         elementosPorPagina,
  //         filtros,
  //         vendedorId
  //       )
  //   );

  //   paginado.total = this.productoRepository.countBySeller(filtros, vendedorId);
  //   paginado.calculateTotalPages();

  //   paginado.data = this.order(paginado.data, filtros);

  //   return paginado;
  // }

  // update(id, productoJSON) {
  //   const productoActualizado = this.productoRepository.update(id, productoJSON);
  //   return productoActualizado;
  // }

  // delete(id) {
  //   this.productoRepository.delete(id);
  // }
}
