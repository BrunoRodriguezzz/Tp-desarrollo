import DireccionEntrega from "../../../models/entities/ubicaciones/direccionEntrega.js";
import Domicilio from "../../../models/entities/ubicaciones/domicilio.js";
import Ciudad from "../../../models/entities/ubicaciones/ciudad.js";
import Provincia from "../../../models/entities/ubicaciones/provincia.js";
import Pais from "../../../models/entities/ubicaciones/pais.js";
import Coordenada from "../../../models/entities/ubicaciones/coordenada.js";
import Usuario from "../../../models/entities/usuario.js";
import Moneda from "../../../models/enums/moneda.js";
import TipoUsuario from "../../../models/enums/tipoUsuario.js";
import Pedido from "../../../models/entities/pedido";
import {
  ConflictError,
  ValidationError,
} from "../../../errors/tiendaSolError.js";
import EstadoPedido from "../../../models/enums/estadoPedido.js";
import Producto from "../../../models/entities/producto.js";
import ItemPedido from "../../../models/entities/itemPedido.js";

const compradorValido = new Usuario("Un usuario", TipoUsuario.COMPRADOR);
const moneda = Moneda.PESO_ARG;
const domicilio = new Domicilio("Una calle", "Una altura");
const ciudad = new Ciudad(
  "Una ciudad",
  new Provincia("Una provincia", new Pais("Un pais"))
);
const coordenada = new Coordenada("latitud", "longitud");
const direccionValida = new DireccionEntrega(domicilio, ciudad, coordenada);
const pedidoValido = new Pedido(compradorValido, moneda, direccionValida);
const productoValido = new Producto(
  new Usuario("Un vendedor", TipoUsuario.VENDEDOR),
  "Un producto"
);
productoValido.setMoneda(Moneda.PESO_ARG);
productoValido.setPrecio(100);
productoValido.setStock(20);

describe("Pedido constructor", () => {
  test("Pedido valido", () => {
    expect(
      () => new Pedido(compradorValido, moneda, direccionValida)
    ).not.toThrow(ValidationError);
  });

  test("Instanciacion correcta", () => {
    const pedido = new Pedido(compradorValido, moneda, direccionValida);
    expect(pedido.estado).toBe(EstadoPedido.PENDIENTE);
    expect(pedido.items.length).toBe(0);
    expect(pedido.total).toBe(0);
  });

  test("Sin comprador", () => {
    expect(() => new Pedido(null, moneda, direccionValida)).toThrow(
      ValidationError
    );
  });

  test("Sin moneda", () => {
    expect(() => new Pedido(compradorValido, null, direccionValida)).toThrow(
      ValidationError
    );
  });

  test("Sin domicilio", () => {
    expect(() => new Pedido(compradorValido, moneda, null)).toThrow(
      ValidationError
    );
  });

  test("Mezclado", () => {
    expect(() => new Pedido(direccionValida, compradorValido, moneda)).toThrow(
      ValidationError
    );
  });
});

describe("Pedido items", () => {
  test("Pedido valido", () => {
    const item = new ItemPedido(productoValido, 10, 100);
    pedidoValido.agregarItem(item);
    expect(pedidoValido.total).toBe(1000);
    pedidoValido.agregarItem(item);
    expect(pedidoValido.total).toBe(2000);
  });

  test("Item producto con precio negativo", () => {
    expect(() =>
      new ItemPedido(productoValido, -10, 100).toThrow(ValidationError)
    );
  });

  test("Item producto con cantidad negativa", () => {
    expect(() =>
      new ItemPedido(productoValido, 10, -100).toThrow(ValidationError)
    );
  });

  test("Hay stock", () => {
    const item = new ItemPedido(productoValido, 10, 100);
    pedidoValido.agregarItem(item);
    expect(pedidoValido.validarStock()).toBe(true);
  });

  test("Hay stock porque no hay productos", () => {
    expect(pedidoValido.validarStock()).toBe(true);
  });

  test("No hay stock", () => {
    const item = new ItemPedido(productoValido, 21, 100);
    pedidoValido.agregarItem(item);
    expect(pedidoValido.validarStock()).toBe(false);
  });
});

describe("Cambios de estado", () => {
  test("Cambios validos", () => {
    pedidoValido.actualizarEstado(
      EstadoPedido.EN_PREPARACION,
      compradorValido,
      "Soy un motivo"
    );
    pedidoValido.actualizarEstado(
      EstadoPedido.CONFIRMADO,
      compradorValido,
      "Soy un motivo"
    );
    pedidoValido.actualizarEstado(
      EstadoPedido.ENVIADO,
      compradorValido,
      "Soy un motivo"
    );
    pedidoValido.actualizarEstado(
      EstadoPedido.ENTREGADO,
      compradorValido,
      "Soy un motivo"
    );
    expect(pedidoValido.estado).toBe(EstadoPedido.ENTREGADO);
    expect(pedidoValido.historialEstados.length).toBe(5);
  });

  test("Intentar cambiar pedido entregado", () => {
    const pedido = new Pedido(compradorValido, moneda, direccionValida);

    pedido.actualizarEstado(
      EstadoPedido.ENTREGADO,
      compradorValido,
      "Soy un motivo"
    );

    expect(() =>
      pedido.actualizarEstado(
        EstadoPedido.EN_PREPARACION,
        compradorValido,
        "Soy un motivo"
      )
    ).toThrow(ConflictError);
  });

  test("Intentar cancelar un pedido enviado", () => {
    const pedido = new Pedido(compradorValido, moneda, direccionValida);

    pedido.actualizarEstado(
      EstadoPedido.ENVIADO,
      compradorValido,
      "Soy un motivo"
    );

    expect(() =>
      pedido.actualizarEstado(
        EstadoPedido.CANCELADO,
        compradorValido,
        "Soy un motivo"
      )
    ).toThrow(ConflictError);
  });

  test("Intentar enviar un pedido cancelado", () => {
    const pedido = new Pedido(compradorValido, moneda, direccionValida);

    pedido.actualizarEstado(
      EstadoPedido.CANCELADO,
      compradorValido,
      "Soy un motivo"
    );

    expect(() =>
      pedido.actualizarEstado(
        EstadoPedido.ENVIADO,
        compradorValido,
        "Soy un motivo"
      )
    ).toThrow(ConflictError);
  });
});
