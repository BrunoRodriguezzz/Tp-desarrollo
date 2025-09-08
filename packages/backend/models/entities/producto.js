import { ValidationError } from "../excepcion/validationError.js";
import { StockError } from "../excepcion/stockError.js";
import { isNumber } from "../../validadores/validadorTiposNativos.js";
import { isMoneda } from "../../validadores/validadorDeEnums.js";
import { validar } from "../../validadores/validadoresProducto.js";
import Categoria from "./categoria.js";

export default class Producto {
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

  constructor(vendedor, titulo) {
    validar(vendedor, titulo);
    this.vendedor = vendedor;
    this.titulo = titulo;
    this.descripcion = "";
    this.categorias = [];
    this.precio = 0;
    this.moneda = "ARS";
    this.stock = 0;
    this.fotos = [];
    this.activo = true;
  }

  estaDisponible(cantidad) {
    if (!isNumber(cantidad) && cantidad <= 0) {
      throw new ValidationError("La cantidad debe ser un número mayor a 0");
    }
    return this.stock >= cantidad;
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

  // Seters
  setDescripcion(descripcion) {
    if (!isString(descripcion)) {
      throw new ValidationError("La descripción debe ser una cadena");
    }
    this.descripcion = descripcion;
  }

  setCategorias(categorias) {
    if (!isArrayOf(categorias, Categoria)) {
      throw new ValidationError(
        "Las categorías deben ser un arreglo de instancias de Categoria"
      );
    }
    this.categorias = categorias;
  }

  setPrecio(precio) {
    if (!isNumber(precio) || precio < 0) {
      throw new ValidationError("El precio debe ser un número positivo");
    }
    this.precio = precio;
  }

  setMoneda(moneda) {
    if (!isMoneda(moneda)) {
      throw new ValidationError("La moneda debe ser un valor válido");
    }
    this.moneda = moneda;
  }

  setStock(stock) {
    if (!isNumber(stock) || stock < 0) {
      throw new ValidationError("El stock debe ser un número positivo");
    }
    this.stock = stock;
  }

  setFotos(fotos) {
    if (!isArrayOf(fotos, String)) {
      throw new ValidationError(
        "Las fotos deben ser un arreglo de cadenas (URLs)"
      );
    }
    this.fotos = fotos;
  }

  setActivo(activo) {
    if (typeof activo !== "boolean") {
      throw new ValidationError("El estado activo debe ser un valor booleano");
    }
    this.activo = activo;
  }

  setId(id) {
    if (!isNumber(id) || id < 0) {
      throw new ValidationError("El ID debe ser un número positivo");
    }
    this.id = id;
  }
}
