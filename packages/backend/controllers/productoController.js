import { z } from "zod";

export default class ProductoController {
  productoService;

  constructor(productoService) {
    this.productoService = productoService;
  }

  // TODO Agregar paginacion
  findAll(req, res) {
    const productos = this.productoService.findAll();

    if (productos === null) {
      res.status(204).send("Productos no encontrados");
    }

    res.status(200).send(productos);
  }
}
