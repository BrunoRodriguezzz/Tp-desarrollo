import Producto from "../models/entities/producto.js";
import Usuario from "../models/entities/usuario.js";

const usuario = new Usuario(0, "nombre", "tipo", "email", "telefono");

export default class ProductoRepository {
  constructor() {
    this.productos = [
      new Producto(usuario, "Producto 1"),
      new Producto(usuario, "Producto 2"),
      new Producto(usuario, "Producto 3"),
    ];
    this.nextId = 1;
  }

  findAll() {
    return this.productos;
  }
}
