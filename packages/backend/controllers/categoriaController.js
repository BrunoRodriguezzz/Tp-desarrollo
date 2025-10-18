import { z } from "zod";
import { ValidationError } from "../errors/tiendaSolError.js";

export default class CategoriaController {
  categoriaService;

  constructor(categoriaService) {
    this.categoriaService = categoriaService;
  }

  async findAll(req, res) {
    try {
        let categorias;

        categorias = await this.categoriaService.findAll();

        return res.status(200).json({ categorias: categorias });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error al obtener las categorias" });
    }
  }

  async save(req, res) {
  try {
    const categoriaData = categoriaSchema.parse(req.body);

    const nuevaCategoria = await this.categoriaService.save(categoriaData);

    return res.status(201).json({ categoria: nuevaCategoria });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: "Datos inválidos",
        detalles: error.errors.map((e) => e.message),
      });
    }

    if (error instanceof ValidationError) {
        return res.status(400).json({ error: error.message });
    }

    console.error(error);
    return res.status(500).json({ error: "Error al guardar la categoría" });

  }
}
}

const categoriaSchema = z.object({
  nombre: z
    .string({
      required_error: "El nombre es obligatorio",
      invalid_type_error: "El nombre debe ser un texto",
    })
    .min(1, "El nombre no puede estar vacío"),
});