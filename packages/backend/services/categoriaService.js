import { NotFoundError, ValidationError } from "../errors/tiendaSolError.js";

export default class CategoriaService {
  constructor(categoriaRepository) {
    this.categoriaRepository = categoriaRepository;
  }

  async findAll() {
    return await this.categoriaRepository.findAll();
  }

  async existe(nombre){
    const categoria = await this.categoriaRepository.existe(nombre);
    if(!categoria) {
        throw new NotFoundError(`La categoría '${nombre}' no existe`);
    }
    return categoria;
  }

  async save(categoriaData) {
    const nuevaCategoria = {
      nombre: categoriaData.nombre,
      cantidad: 0
    }
      if(await this.categoriaRepository.existeSimilar(categoriaData.nombre)) {
          throw new ValidationError("Ya existe una categoría con ese nombre");
      }

      return await this.categoriaRepository.save(nuevaCategoria);
  }

  async incrementarCantidad(nombre) {
      const existe = await this.categoriaRepository.existe(nombre);
      if (!existe) {
      throw new NotFoundError(`La categoría '${nombre}' no existe`);
      }

      const categoriaActualizada = await this.categoriaRepository.incrementarCantidad(nombre);
      return categoriaActualizada;
  }

  async decrementarCantidad(nombre) {

    const categoria = await this.categoriaRepository.findByNombre(nombre);
    if (categoria && categoria.cantidad > 0) {
      return await this.categoriaRepository.decrementarCantidad(nombre);
    }

    return categoria;
  }
}
