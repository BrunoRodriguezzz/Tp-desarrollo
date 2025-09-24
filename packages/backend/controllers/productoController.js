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

  create(req, res) {
    const resultBody = validarParsearProducto(req);

    const nuevoProducto = this.productoService.create(resultBody);
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
    const id = validarParsearID(req);

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

  update(req, res) {
    const id = validarParsearID(req);
    const resultBody = validarParsearUpdateProducto(req);

    const productoActualizado = this.productoService.update(id, resultBody);

    res.status(200).json(productoActualizado);
  }
}
