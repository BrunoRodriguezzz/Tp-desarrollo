import Builder from "./productoBuilder.js";
import { ValidationError } from "../../excepcion/validationError.js";
import { StockError } from "../../excepcion/stockError.js";
import { isNumber } from "../../../validadores/validadorTiposNativos.js";

class Producto {
  id;
  vendedor;
  titulo;
  descripcion;
  categorias;
  precio;
  moneda;
  stock;
  fotos;
  activo;

  constructor(builder) {
    this.id = builder.id;
    this.vendedor = builder.vendedor;
    this.titulo = builder.titulo;
    // Opcionales
    this.descripcion = builder.descripcion || null;
    this.categorias = builder.categorias || [];
    this.precio = builder.precio || 0;
    this.moneda = builder.moneda || null;
    this.stock = builder.stock || 0;
    this.fotos = builder.fotos || [];
    this.activo = builder.activo ?? true;
  }

  // Builder estático
  static builder(vendedor, titulo) {
    return new Builder(Producto, vendedor, titulo);
  }

  estaDisponible(cantidad) {
    if (!isNumber(cantidad)) {
      throw new ValidationError("La cantidad debe ser un número");
    } else if (cantidad <= 0) {
      throw new ValidationError("La cantidad debe ser mayor a 0");
    }
    return this.activo && this.stock >= cantidad;
  }

  reducirStock(cantidad) {
    if (!isNumber(cantidad)) {
      throw new ValidationError("La cantidad debe ser un número");
    }
    if (this.stock - cantidad < 0) {
      throw new StockError("No hay suficiente stock para reducir");
    }
    this.stock -= cantidad;
  }

  aumentarStock(cantidad) {
    if (!isNumber(cantidad)) {
      throw new ValidationError("La cantidad debe ser un número");
    }
    this.stock += cantidad;
  }
}

export default Producto;
