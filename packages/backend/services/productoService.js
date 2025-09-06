import Producto from "../models/entities/Producto.js";

export default class ProductoService {
  constructor(ProductoRepository) {
    this.productoRepository = ProductoRepository;
  }

  findAll() {
    return this.productoRepository.findAll();
  }
}
