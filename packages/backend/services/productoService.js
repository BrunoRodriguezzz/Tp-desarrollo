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

    return paginado;
  }
}
