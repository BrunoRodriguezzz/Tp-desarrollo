import ProductoModel from "../schemas/productoSchema.js";
import { NotFoundError } from "../errors/tiendaSolError.js";

export default class ProductoRepository {
  constructor() {
    this.model = ProductoModel;
  }

  async save(producto) {
    const nuevoProducto = new this.model(producto);
    let aux;
    try {
      aux = await nuevoProducto.save();
    } catch (error) {
      console.error("Error al guardar el producto:", error);
    }
    return aux;
  }

  async count(filtros) {
    return await this.model.countDocuments(this.applyFilters(filtros));
  }

  async findByPage(page = 1, limit = 10, filtros) {
    const skip = (page - 1) * limit;
    let query = this.model.find(this.applyFilters(filtros));

    if (filtros.orderBy === "price_asc") {
      query = query.sort({ precio: 1 });
    } else if (filtros.orderBy === "price_desc") {
      query = query.sort({ precio: -1 });
    }

    // TODO: Implementar best_seller cuando haya persistencia de pedidos

    const productos = await query.skip(skip).limit(limit).exec();
    return productos;
  }

  async findById(id) {
    const producto = await this.model.findOne({ _id: id, activo: true }).exec();

    return producto;
  }

  async update(id, productoModificado) {
    const producto = await this.model
      .findByIdAndUpdate(id, productoModificado, {
        new: true,
      })
      .exec();

    if (!producto) {
      throw new NotFoundError("Producto no encontrado");
    }

    return producto;
  }

  async delete(id) {
    const result = await this.model.deleteOne({ _id: id });
    return result.deletedCount > 0;
  }

  applyFilters(filtros) {
    const { maxPrice, minPrice, search, categoria, vendedor } = filtros;

    let query = { activo: true };

    if (minPrice || maxPrice) {
      query.precio = {};
      if (minPrice) query.precio.$gte = Number(minPrice);
      if (maxPrice) query.precio.$lte = Number(maxPrice);
    }

    if (search) {
      query.$or = [
        { titulo: { $regex: search, $options: "i" } },
        { descripcion: { $regex: search, $options: "i" } },
        { categorias: { $elemMatch: { $regex: search, $options: "i" } } },
      ];
    }

    if (categoria) {
      if (Array.isArray(categoria)) {
        query.categorias = { $all: categoria };
      } else {
        query.categorias = categoria;
      }
    }

    if (vendedor) {
      query.vendedor = vendedor;
    }

    return query;
  }
}
