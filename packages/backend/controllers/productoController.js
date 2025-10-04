import { paginationGetValues } from "../utils/pagination.js";
import { validarParsearID } from "../validadores/validadorTiposNativos.js";
import {
  validarParsearProducto,
  validarParsearUpdateProducto,
} from "../validadores/validadoresProducto.js";

export default class ProductoController {
  productoService;

  constructor(productoService) {
    this.productoService = productoService;
  }

  async create(req, res) {
    const producto = await this.productoService.create(req.body);
    res.status(201).json(producto);
  }

  async findAll(req, res) {
    const productosPaginados = await paginationGetValues(
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

  async findById(req, res) {
    const producto = await this.productoService.findById(req.params.id);
    res.status(200).json(producto);
  }

  async findBySeller(req, res) {
    const id = validarParsearID(req);

    const productosPaginados = await paginationGetValues(
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

  update(req, res) {
    const id = validarParsearID(req);
    const resultBody = validarParsearUpdateProducto(req);

    const productoActualizado = this.productoService.update(id, resultBody);

    res.status(200).json(productoActualizado);
  }

  delete(req, res) {
    const id = validarParsearID(req);
    this.productoService.delete(id);
    res.status(204).send();
  }
}
