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
    const productos = await this.productoService.findAll();
    res.status(200).json(productos);
  }

  // async findAll(req, res) {
  //   const productosPaginados = paginationGetValues(
  //     req,
  //     (page, limit, filtros) =>
  //       this.productoService.findAll(page, limit, filtros)
  //   );

  // findById(req, res) {
  //   const id = validarParsearID(req);
  //   const producto = this.productoService.findById(id);
  //   res.status(200).json(producto);
  // }

  //   if (productosPaginados === null) {
  //     res.status(204).send("No se encontraron productos");
  //     return;
  //   }

  //   res.status(200).json(productosPaginados);
  // }

  // findBySeller(req, res) {
  //   const id = validarParsearID(req);

  //   const productosPaginados = paginationGetValues(
  //     req,
  //     (page, limit, filtros) =>
  //       this.productoService.findBySeller(id, page, limit, filtros)
  //   );

  //   if (productosPaginados === null) {
  //     res.status(204).send("No se encontraron productos");
  //     return;
  //   }

  //   res.status(200).json(productosPaginados);
  // }

  // update(req, res) {
  //   const id = validarParsearID(req);
  //   const resultBody = validarParsearUpdateProducto(req);

  //   const productoActualizado = this.productoService.update(id, resultBody);

  //   res.status(200).json(productoActualizado);
  // }

  // delete(req, res) {
  //   const id = validarParsearID(req);
  //   this.productoService.delete(id);
  //   res.status(204).send();
  // }
}
