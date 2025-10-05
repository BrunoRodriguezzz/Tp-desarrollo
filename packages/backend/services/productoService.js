import { parsearMoneda } from "../validadores/validadorDeEnums.js";
import Producto from "../models/entities/producto.js";
import Categoria from "../models/entities/categoria.js";
import Moneda from "../models/enums/moneda.js";
import { paginationBuildResponse } from "../utils/pagination.js";
import { NotFoundError } from "../errors/tiendaSolError.js";

export default class ProductoService {
  constructor(ProductoRepository, usuarioRepository) {
    this.productoRepository = ProductoRepository;
    this.usuarioRepository = usuarioRepository;
  }

  async create(nuevoProductoJSON) {
    const usuario = await this.usuarioRepository.findById(
      nuevoProductoJSON.vendedor
    );

    if (!usuario) throw new NotFoundError("Usuario no encontrado");

    const nuevoProducto = new Producto(usuario, nuevoProductoJSON.titulo);

    const tipoMoneda = parsearMoneda(nuevoProductoJSON.moneda);

    const categorias = (nuevoProductoJSON.categorias || []).map(
      (nombre) => new Categoria(nombre)
    );

    nuevoProducto.setCategorias(categorias);
    nuevoProducto.setFotos(nuevoProductoJSON.fotos || []);
    nuevoProducto.setDescripcion(nuevoProductoJSON.descripcion || "");
    nuevoProducto.setPrecio(nuevoProductoJSON.precio || 0);
    nuevoProducto.setMoneda(tipoMoneda || Moneda.PESO_ARG);
    nuevoProducto.aumentarStock(nuevoProductoJSON.stock || 0);
    nuevoProducto.setActivo(true);

    const productoParaGuardar = {
      vendedor: usuario.id,
      titulo: nuevoProducto.titulo,
      descripcion: nuevoProducto.descripcion,
      categorias: nuevoProducto.categorias.map((categoria) => categoria.nombre),
      precio: nuevoProducto.precio,
      moneda: nuevoProducto.moneda,
      stock: nuevoProducto.stock,
      fotos: nuevoProducto.fotos,
      activo: nuevoProducto.activo,
    };

    const productoGuardado =
      await this.productoRepository.save(productoParaGuardar);
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

  async update(id, productoJSON) {
    const productoActualizado = await this.productoRepository.update(
      id,
      productoJSON
    );

    return productoActualizado;
  }

  async delete(id) {
    const result = await this.productoRepository.delete(id);
    return result;
  }
}
