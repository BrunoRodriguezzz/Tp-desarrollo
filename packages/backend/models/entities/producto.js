import { ValidationError } from "../../errors/tiendaSolError.js";
import { isMoneda } from "../../validadores/validadorDeEnums.js";
import { validar } from "../../validadores/validadoresProducto.js";
import { validarCategoria } from "../../validadores/validadorDeClases.js";
import { validarNumeroPositivo, isArrayOf } from "../../validadores/validadorTiposNativos.js";
import { validarString } from "../../validadores/validadorTiposNativos.js";
import Moneda from "../enums/moneda.js";
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
    this.moneda = Moneda.ARS;
    this.stock = 0;
    this.fotos = [];
    this.activo = true;
  }

  estaDisponible(cantidad) {
    validarNumeroPositivo(cantidad, "Cantidad");
    return this.stock >= cantidad;
  }

  reducirStock(cantidad) {
    validarNumeroPositivo(cantidad, "Cantidad");
    if (this.stock - cantidad < 0) {
      throw new ValidationError("No hay suficiente stock para reducir");
    }
    this.stock -= cantidad;
  }

  aumentarStock(cantidad) {
    validarNumeroPositivo(cantidad, "Cantidad");
    this.stock += cantidad;
  }

  agregarCategoria(categoria) {
    validarCategoria(categoria);
    this.categorias.push(categoria);
  }

  agregarFoto(url) {
    validarString(url, "URL de la foto");
    this.fotos.push(url);
  }

  // Seters
  setDescripcion(descripcion) {
    validarString(descripcion, "Descripción");
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
    validarNumeroPositivo(precio, "Precio");
    this.precio = precio;
  }

  setMoneda(moneda) {
    if (!isMoneda(moneda)) {
      throw new ValidationError("La moneda debe ser un valor válido");
    }
    this.moneda = moneda;
  }

  setStock(stock) {
    validarNumeroPositivo(stock, "Stock");
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
    validarNumeroPositivo(id, "ID");
    this.id = id;
  }
}
