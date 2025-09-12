import { paginationBuildResponse } from "../utils/pagination.js";
import Producto from "../models/entities/producto.js";
import Usuario from "../models/entities/usuario.js";
import Categoria from "../models/entities/categoria.js";

const usuario = new Usuario("HARDCODE BRO", "tipo");
usuario.id = 1;

export default class ProductoService {
  constructor(ProductoRepository) {
    this.productoRepository = ProductoRepository;
  }

  create(nuevoProductoJSON) {
    //! El vendedor full hardcodeado obviamente se tiene que ir
    const nuevoProducto = new Producto(usuario, nuevoProductoJSON.titulo);

    const categorias = (nuevoProductoJSON.categorias || []).map(
      (nombre) => new Categoria(nombre)
    );

    if (Array.isArray(nuevoProductoJSON.categorias)) {
      for (const categoria of categorias) {
        nuevoProducto.agregarCategoria(categoria);
      }
    }

    if (Array.isArray(nuevoProductoJSON.fotos)) {
      nuevoProductoJSON.fotos.forEach((foto) =>
        nuevoProducto.agregarFoto(foto)
      );
    }

    if (typeof nuevoProductoJSON.descripcion === "string") {
      nuevoProducto.setDescripcion(nuevoProductoJSON.descripcion);
    }

    if (typeof nuevoProductoJSON.precio === "number") {
      nuevoProducto.setPrecio(nuevoProductoJSON.precio);
    }
    if (typeof nuevoProductoJSON.moneda === "string") {
      nuevoProducto.setMoneda(nuevoProductoJSON.moneda);
    }
    if (typeof nuevoProductoJSON.stock === "number") {
      nuevoProducto.aumentarStock(nuevoProductoJSON.stock);
    }

    // Estado activo opcional
    if (typeof nuevoProductoJSON.activo === "boolean") {
      nuevoProducto.setActivo(nuevoProductoJSON.activo);
    }

    const productoGuardado = this.productoRepository.create(nuevoProducto);
    return productoGuardado;
  }

  findAll(page = 1, limit = 10, filtros = {}) {
    const paginado = paginationBuildResponse(
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

    paginado.total = this.productoRepository.countAll(filtros);
    paginado.calculateTotalPages();

    paginado.data = this.order(paginado.data, filtros);

    return paginado;
  }

  findBySeller(vendedorId, page = 1, limit = 10, filtros = {}) {
    const paginado = paginationBuildResponse(
      page,
      limit,
      filtros,
      (numeroPagina, elementosPorPagina, filtros) =>
        this.productoRepository.findBySeller(
          numeroPagina,
          elementosPorPagina,
          filtros,
          vendedorId
        )
    );

    paginado.total = this.productoRepository.countBySeller(filtros, vendedorId);
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
}
