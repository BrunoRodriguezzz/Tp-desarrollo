import { paginationGetValues } from '../utils/pagination.js';
import { validarParsearID } from '../validadores/validadorTiposNativos.js';
import {
  validarParsearProducto,
  validarParsearUpdateProducto,
} from '../validadores/validadoresProducto.js';
import { NotFoundError, ValidationError } from '../errors/tiendaSolError.js';

export default class ProductoController {
  productoService;

  constructor(productoService) {
    this.productoService = productoService;
  }

  async create(req, res) {
    const resultBody = validarParsearProducto(req);
    const producto = await this.productoService.create(resultBody);
    res.status(201).json(producto);
  }

  async findAll(req, res) {
    const productosPaginados = await paginationGetValues(req, (page, limit, filtros) =>
      this.productoService.findAll(page, limit, filtros)
    );

    if (
      !productosPaginados ||
      productosPaginados.total === 0 ||
      (Array.isArray(productosPaginados.data) && productosPaginados.data.length === 0)
    ) {
      return res.status(204).send();
    }

    res.status(200).json(productosPaginados);
  }

  async findById(req, res) {
    const id = req.params.id;

    if (!validarParsearID(id)) {
      throw new ValidationError('ID de producto inválido');
    }

    const producto = await this.productoService.findById(id);

    if (!producto) {
      throw new NotFoundError('Producto no encontrado');
    }

    res.status(200).json(producto);
  }

  async update(req, res) {
    const id = req.params.id;

    if (!validarParsearID(id)) {
      throw new ValidationError('ID de producto inválido');
    }

    const resultBody = validarParsearUpdateProducto(req);
    const productoActualizado = await this.productoService.update(id, resultBody);

    if (!productoActualizado) {
      throw new NotFoundError('Producto no encontrado');
    }

    res.status(200).json(productoActualizado);
  }

  async delete(req, res) {
    const id = req.params.id;

    if (!validarParsearID(id)) {
      throw new ValidationError('ID de producto inválido');
    }

    const deleted = await this.productoService.delete(id);

    if (!deleted) {
      throw new NotFoundError('Producto no encontrado');
    }

    res.status(204).send();
  }
}
