import { paginationBuildResponse } from "../utils/pagination.js";
import { parsearMoneda } from "../validadores/validadorDeEnums.js";
import Producto from "../models/entities/producto.js";
import Usuario from "../models/entities/usuario.js";
import Categoria from "../models/entities/categoria.js";
import Moneda from "../models/enums/moneda.js";

const usuario = new Usuario("HARDCODE BRO", "tipo");
usuario.id = 1;

export default class ProductoService {
  constructor(ProductoRepository) {
    this.productoRepository = ProductoRepository;
  }

  create(nuevoProductoJSON) {
    //! El vendedor full hardcodeado obviamente se tiene que ir
    const nuevoProducto = new Producto(usuario, nuevoProductoJSON.titulo);
    const tipoMoneda = parsearMoneda(nuevoProductoJSON.moneda);

    const categorias = (nuevoProductoJSON.categorias || []).map(
      (nombre) => new Categoria(nombre)
    );

    nuevoProducto.setCategorias(categorias);
    nuevoProducto.setFotos(nuevoProductoJSON.fotos || []);
    nuevoProducto.setDescripcion(nuevoProductoJSON.descripcion || "");
    nuevoProducto.setPrecio(nuevoProductoJSON.precio || 0);
    nuevoProducto.setMoneda(tipoMoneda || Moneda.PESO_ARG); // Hay q convertir a enum
    nuevoProducto.aumentarStock(nuevoProductoJSON.stock || 0);
    nuevoProducto.setActivo(true);

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

  update(id, productoJSON) {
    const productoActualizado = this.productoRepository.update(id, productoJSON);
    return productoActualizado;
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