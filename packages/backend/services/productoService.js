export default class ProductoService {
  constructor(ProductoRepository) {
    this.productoRepository = ProductoRepository;
  }

  findAll() {
    return this.productoRepository.findAll();
  }

  findAll(page = 1, limit = 10, filtros = {}) {
    const numeroPagina = Math.max(Number(page), 1);
    const elementosPorPagina = Math.min(Math.max(Number(limit), 1), 100);

    const productos = this.productoRepository.findByPage(
      numeroPagina,
      elementosPorPagina,
      filtros
    );

    const total = this.productoRepository.countAll();
    const totalPages = Math.ceil(total / elementosPorPagina);

    return {
      page: numeroPagina,
      limit: elementosPorPagina,
      total,
      totalPages,
      data: productos,
    };
  }
}
