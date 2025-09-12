import { paginationBuildResponse } from "../utils/pagination.js";
import { filtrarPorVendedor } from "../models/filters/productFilters.js";

export default class ProductoService {
  constructor(ProductoRepository) {
    this.productoRepository = ProductoRepository;
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
