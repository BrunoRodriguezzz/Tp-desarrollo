import Producto from "../../../models/entities/producto.js";
import Categoria from "../../../models/entities/categoria.js";
import Moneda from "../../../models/enums/moneda.js";
import { ValidationError } from "../../../errors/tiendaSolError.js";
import Usuario from "../../../models/entities/usuario.js";

const vendedorValido = new Usuario("Juan", "Uteniano");
vendedorValido.id = 1;
const tituloValido = "Producto Test";

describe("Producto: constructor", () => {
  test("crea producto con datos válidos", () => {
    const producto = new Producto(vendedorValido, tituloValido);
    expect(producto.vendedor).toBe(vendedorValido);
    expect(producto.titulo).toBe(tituloValido);
    expect(producto.stock).toBe(0);
    expect(producto.precio).toBe(0);
    expect(producto.activo).toBe(true);
  });
  test("lanza error si vendedor es inválido", () => {
    expect(() => new Producto(null, tituloValido)).toThrow(ValidationError);
  });
  test("lanza error si título es vacío", () => {
    expect(() => new Producto(vendedorValido, "")).toThrow(ValidationError);
  });
});

describe("Producto: setters", () => {
  test("setPrecio no permite negativos", () => {
    const producto = new Producto(vendedorValido, tituloValido);
    expect(() => producto.setPrecio(-1)).toThrow(ValidationError);
  });
  test("setStock no permite negativos", () => {
    const producto = new Producto(vendedorValido, tituloValido);
    expect(() => producto.setStock(-5)).toThrow(ValidationError);
  });
  test("setMoneda solo acepta válidas", () => {
    const producto = new Producto(vendedorValido, tituloValido);
    expect(() => producto.setMoneda("INVALIDA")).toThrow(ValidationError);
    expect(() => producto.setMoneda(Moneda.PESO_ARG)).not.toThrow();
  });
  test("setCategorias solo acepta array de Categoria", () => {
    const producto = new Producto(vendedorValido, tituloValido);
    expect(() => producto.setCategorias(["noCategoria"])).toThrow(
      ValidationError
    );
    expect(() => producto.setCategorias([new Categoria("cat1")])).not.toThrow();
  });
  test("setFotos solo acepta array de strings", () => {
    const producto = new Producto(vendedorValido, tituloValido);
    expect(() => producto.setFotos([123])).toThrow(ValidationError);
    expect(() => producto.setFotos(["url1"])).not.toThrow();
  });
  test("setActivo solo acepta booleano", () => {
    const producto = new Producto(vendedorValido, tituloValido);
    expect(() => producto.setActivo("true")).toThrow(ValidationError);
    expect(() => producto.setActivo(false)).not.toThrow();
  });
  test("setId no permite ID negativo", () => {
    const producto = new Producto(vendedorValido, tituloValido);
    expect(() => producto.setId(-1)).toThrow(ValidationError);
  });
});

describe("Producto: stock y disponibilidad", () => {
  test("estaDisponible true si hay stock suficiente", () => {
    const producto = new Producto(vendedorValido, tituloValido);
    producto.setStock(10);
    expect(producto.estaDisponible(5)).toBe(true);
  });
  test("estaDisponible false si no hay stock suficiente", () => {
    const producto = new Producto(vendedorValido, tituloValido);
    producto.setStock(2);
    expect(producto.estaDisponible(5)).toBe(false);
  });
  test("reducirStock lanza error si no hay suficiente", () => {
    const producto = new Producto(vendedorValido, tituloValido);
    producto.setStock(2);
    expect(() => producto.reducirStock(5)).toThrow(ValidationError);
  });
  test("reducirStock descuenta correctamente", () => {
    const producto = new Producto(vendedorValido, tituloValido);
    producto.setStock(10);
    producto.reducirStock(3);
    expect(producto.stock).toBe(7);
  });
  test("aumentarStock suma correctamente", () => {
    const producto = new Producto(vendedorValido, tituloValido);
    producto.aumentarStock(5);
    expect(producto.stock).toBe(5);
  });
});

describe("Producto: categorías y fotos", () => {
  test("agregarCategoria solo acepta instancias de Categoria", () => {
    const producto = new Producto(vendedorValido, tituloValido);
    expect(() => producto.agregarCategoria("cat")).toThrow(ValidationError);
    expect(() => producto.agregarCategoria(new Categoria("cat"))).not.toThrow();
  });
  test("agregarFoto solo acepta strings", () => {
    const producto = new Producto(vendedorValido, tituloValido);
    expect(() => producto.agregarFoto(123)).toThrow(ValidationError);
    expect(() => producto.agregarFoto("url")).not.toThrow();
  });
});
