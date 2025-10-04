export async function paginationGetValues(req, func) {
  const { page = 1, limit = 10 } = req.query;
  const filtros = req.query;

  return func(page, limit, filtros);
}

export async function paginationBuildResponse(page, limit, filtros, func) {
  const numeroPagina = Math.max(Number(page), 1);
  const elementosPorPagina = Math.min(Math.max(Number(limit), 1), 100);
  const data = await func(numeroPagina, elementosPorPagina, filtros);

  return new PaginationDto(numeroPagina, elementosPorPagina, data);
}

export class PaginationDto {
  numeroPagina;
  elementosPorPagina;
  total;
  totalPages;
  data;

  constructor(numeroPagina, elementosPorPagina, data) {
    this.numeroPagina = numeroPagina;
    this.elementosPorPagina = elementosPorPagina;
    this.data = data;
  }

  calculateTotalPages() {
    this.totalPages = Math.ceil(this.total / this.elementosPorPagina);
  }
}
