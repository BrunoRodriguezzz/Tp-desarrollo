import { parsearMoneda } from '../validadores/validadorDeEnums.js';
import Producto from '../models/entities/producto.js';
import Categoria from '../models/entities/categoria.js';
import Moneda from '../models/enums/moneda.js';
import { paginationBuildResponse } from '../utils/pagination.js';
import { ForbiddenError, NotFoundError } from '../errors/tiendaSolError.js';

export default class ProductoService {
  constructor(ProductoRepository, UsuarioRepository, CategoriaService) {
    this.productoRepository = ProductoRepository;
    this.usuarioRepository = UsuarioRepository;
    this.categoriaService = CategoriaService;
  }

  async create(nuevoProductoJSON) {
    const usuario = await this.usuarioRepository.findById(nuevoProductoJSON.vendedor);

    if (!usuario) throw new NotFoundError('Usuario no encontrado');

    const nuevoProducto = new Producto(usuario, nuevoProductoJSON.titulo);

    const tipoMoneda = parsearMoneda(nuevoProductoJSON.moneda);

    const categorias = (nuevoProductoJSON.categorias || []).map(nombre => new Categoria(nombre));

    const fotos = nuevoProductoJSON.files || nuevoProductoJSON.fotos || [];

    for (const c of categorias) {
      await this.categoriaService.existe(c.nombre);
    }

    nuevoProducto.setCategorias(categorias);
    nuevoProducto.setFotos(fotos);
    nuevoProducto.setDescripcion(nuevoProductoJSON.descripcion || '');
    nuevoProducto.setPrecio(nuevoProductoJSON.precio || 0);
    nuevoProducto.setMoneda(tipoMoneda || Moneda.PESO_ARG);
    nuevoProducto.aumentarStock(nuevoProductoJSON.stock || 0);
    nuevoProducto.setActivo(true);

    const productoParaGuardar = {
      vendedor: usuario.id,
      titulo: nuevoProducto.titulo,
      descripcion: nuevoProducto.descripcion,
      categorias: nuevoProducto.categorias.map(categoria => categoria.nombre),
      precio: nuevoProducto.precio,
      moneda: nuevoProducto.moneda,
      stock: nuevoProducto.stock,
      fotos: nuevoProducto.fotos,
      activo: nuevoProducto.activo,
    };

    const productoGuardado = await this.productoRepository.save(productoParaGuardar);
    for (const c of categorias) {
      await this.categoriaService.incrementarCantidad(c.nombre);
    }
    return productoGuardado;
  }

  async findAll(page = 1, limit = 10, filtros = {}) {
    const paginado = await paginationBuildResponse(
      page,
      limit,
      filtros,
      (page, elementosPorPagina, filtros) =>
        this.productoRepository.findByPage(page, elementosPorPagina, filtros)
    );

    paginado.total = await this.productoRepository.count(filtros);
    paginado.calculateTotalPages();

    return paginado;
  }

  async findById(id) {
    return await this.productoRepository.findById(id);
  }

  async findByUser(page = 1, limit = 10, vendedorId) {
    const filtros = { vendedor: vendedorId };
    const paginado = await paginationBuildResponse(
      page,
      limit,
      filtros,
      (page, elementosPorPagina, filtros) =>
        this.productoRepository.findByPage(page, elementosPorPagina, filtros)
    );

    paginado.total = await this.productoRepository.count(filtros);
    paginado.calculateTotalPages();

    return paginado;
  }

  async update(id, productoJSON, vendedorId) {
    console.log("Llego a update")
    const productoActual = await this.productoRepository.findById(id);
    if (!productoActual) {
      throw new NotFoundError(`Producto con id ${id} no existe`);
    }

    if (productoActual.vendedor.id.toString() != vendedorId) {
      throw new ForbiddenError('El vendedor que quiere actualizar no es el propietario');
    }

    if (productoJSON.categorias) {
      for (const nombreCat of productoJSON.categorias) {
        await this.categoriaService.existe(nombreCat);
      }
    }

    if (productoActual.categorias) {
      for (const c of productoActual.categorias) {
        await this.categoriaService.decrementarCantidad(c);
      }
    }

    const productoActualizado = await this.productoRepository.update(id, productoJSON);

    for (const c of productoActualizado.categorias) {
      await this.categoriaService.incrementarCantidad(c);
    }

    return productoActualizado;
  }

  async delete(id, vendedorId) {
    const productoActual = await this.productoRepository.findById(id);
    if (!productoActual) {
      throw new NotFoundError(`Producto con id ${id} no existe`);
    }

    if (productoActual.vendedor.id.toString() != vendedorId) {
      throw new ForbiddenError('El vendedor que quiere eliminar no es el propietario');
    }

    if (productoActual.categorias) {
      for (const c of productoActual.categorias) {
        await this.categoriaService.decrementarCantidad(c.nombre);
      }
    }

    const result = await this.productoRepository.delete(id);
    return result;
  }
}
