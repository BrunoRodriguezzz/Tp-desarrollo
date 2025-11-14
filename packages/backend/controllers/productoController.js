import { paginationGetValues } from '../utils/pagination.js';
import fs from 'node:fs';
import path from 'node:path';
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

  withFotoUrls(req, producto) {
    if (!producto) return producto;
    const base = 'fotosProductos/';
    const fotos = Array.isArray(producto.fotos)
      ? producto.fotos.map(f => (typeof f === 'string' && !f.startsWith('http') ? base + f : f))
      : [];
    try {
      const plain = typeof producto.toObject === 'function' ? producto.toObject() : { ...producto };
      return { ...plain, fotos };
    } catch {
      return { ...producto, fotos };
    }
  }

  async create(req, res) {
    try {
      // Mapear archivos subidos a req.body.files (solo nombres de archivo)
      if (Array.isArray(req.files) && req.files.length > 0) {
        req.body.files = req.files.map(f => f.filename);
      }
      const resultBody = validarParsearProducto(req);
      const producto = await this.productoService.create(resultBody);
      res.status(201).json(this.withFotoUrls(req, producto));
    } catch (err) {
      // En caso de error, eliminamos archivos subidos para no dejar basura
      const uploadedFiles = req.files ? req.files.map(file => file.filename) : [];
      if (uploadedFiles.length) {
        const uploadRoot = path.resolve(process.cwd(), 'public', 'fotosProductos');
        for (const file of uploadedFiles) {
          const filePath = path.join(uploadRoot, file);
          try {
            if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
          } catch (e) {
            // log opcional
          }
        }
      }
      throw err;
    }
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

    // Agregar URLs completas a fotos en la respuesta paginada
    productosPaginados.data = (productosPaginados.data || []).map(p => this.withFotoUrls(req, p));
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

    res.status(200).json(this.withFotoUrls(req, producto));
  }

  async findByUser(req, res) {
    const productosPaginados = await paginationGetValues(req, (page, limit, _filtros) =>
      this.productoService.findByUser(page, limit, req.user.id)
    );

    if (
      !productosPaginados ||
      productosPaginados.total === 0 ||
      (Array.isArray(productosPaginados.data) && productosPaginados.data.length === 0)
    ) {
      return res.status(204).send();
    }

    productosPaginados.data = (productosPaginados.data || []).map(p => this.withFotoUrls(req, p));

    res.status(200).json(productosPaginados);
  }

  async update(req, res) {
    console.log('Llego a update');
    const id = req.params.id;

    if (!validarParsearID(id)) {
      throw new ValidationError('ID de producto inválido');
    }

    const resultBody = validarParsearUpdateProducto(req);
    const productoActualizado = await this.productoService.update(id, resultBody, req.user.id);

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

    const deleted = await this.productoService.delete(id, req.user.id);

    if (!deleted) {
      throw new NotFoundError('Producto no encontrado');
    }

    res.status(204).send();
  }
}
