import { z } from "zod";
import { paginationGetValues } from "../utils/pagination.js";

export default class ProductoController {
  productoService;

  constructor(productoService) {
    this.productoService = productoService;
  }

  create(req, res) {
    const body = req.body;
    const resultBody = productoSchema.safeParse(body);

    if (resultBody.error) {
      res.status(400).json(resultBody.error.issues);
      return;
    }

    const nuevoProducto = this.productoService.create(resultBody.data);
    res.status(201).json(nuevoProducto);
  }

  findAll(req, res) {
    const productosPaginados = paginationGetValues(
      req,
      (page, limit, filtros) =>
        this.productoService.findAll(page, limit, filtros)
    );

    if (productosPaginados === null) {
      res.status(204).send("No se encontraron productos");
      return;
    }

    res.status(200).json(productosPaginados);
  }

  findBySeller(req, res) {
    const resultId = idTransform.safeParse(req.params.id);

    if (resultId.error) {
      res.status(400).json(resultId.error.issues);
      return;
    }

    const id = resultId.data;

    const productosPaginados = paginationGetValues(
      req,
      (page, limit, filtros) =>
        this.productoService.findBySeller(id, page, limit, filtros)
    );

    if (productosPaginados === null) {
      res.status(204).send("No se encontraron productos");
      return;
    }

    res.status(200).json(productosPaginados);
  }
}

const productoSchema = z.object({
  vendedor: z.number().min(1),
  titulo: z.string().min(3).max(50),
  descripcion: z.string().max(500).optional(),
  categorias: z.array(z.string()).optional(),
  precio: z.number().min(0).optional(),
  moneda: z.string().length(3).optional(),
});

const idTransform = z.string().transform((val, ctx) => {
  const num = Number(val);
  if (isNaN(num)) {
    ctx.addIssue({
      code: "INVALID_ID",
      message: "id must be a number",
    });
    return z.NEVER;
  }
  return num;
});
