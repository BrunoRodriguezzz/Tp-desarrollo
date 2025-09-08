import { z } from "zod";

export default class ProductoController {
  productoService;

  constructor(productoService) {
    this.productoService = productoService;
  }

  findAll(req, res) {
    const { page = 1, limit = 10 } = req.query;
    const filtros = req.query;

    const productosPaginados = this.productoService.findAll(
      page,
      limit,
      filtros
    );

    if (productosPaginados === null) {
      res.status(204).send("No se encontraron productos");
      return;
    }

    res.status(200).json(productosPaginados);
  }
}

const productoSchema = z.object({
  vendendor: z.number().min(1),
  titulo: z.string().min(3).max(50),
  descripcion: z.string().max(500).optional(),
  categorias: z.array(z.number().min(1)).optional(),
  precio: z.number().min(0).optional(),
  moneda: z.string().length(3).optional(),
});
