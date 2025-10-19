import { NotFoundError, ValidationError } from "../errors/tiendaSolError.js";

export default class CategoriaService {
  constructor(categoriaRepository) {
    this.categoriaRepository = categoriaRepository;
  }

  async findAll() {
    return await this.categoriaRepository.findAll();
  }

  async save(categoriaData) {
    const nuevaCategoria = {
        nombre: categoriaData.nombre,
        cantidad: 0
    }

    if(await this.categoriaRepository.existsSimilar(categoriaData.nombre)) {
        throw new ValidationError("Ya existe una categoría con ese nombre");
    }

    return await this.categoriaRepository.save(nuevaCategoria);
  }
}
