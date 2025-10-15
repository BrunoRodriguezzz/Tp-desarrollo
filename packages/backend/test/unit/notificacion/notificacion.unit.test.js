import ItemPedido from "../../../models/entities/itemPedido";
import FactoryNotificacion from "../../../models/entities/notificacion/factoryNotificacion";
import DireccionEntrega from "../../../models/entities/ubicaciones/direccionEntrega";
import Domicilio from "../../../models/entities/ubicaciones/domicilio";
import Usuario from "../../../models/entities/usuario";
import TipoUsuario from "../../../models/enums/tipoUsuario";
import Producto from "../../../models/entities/producto";
import Pedido from "../../../models/entities/pedido";
import Moneda from "../../../models/enums/moneda";
import EstadoPedido from "../../../models/enums/estadoPedido";
import Ciudad from "../../../models/entities/ubicaciones/ciudad";
import Coordenada from "../../../models/entities/ubicaciones/coordenada";
import Pais from "../../../models/entities/ubicaciones/pais";
import Provincia from "../../../models/entities/ubicaciones/provincia";
import { interpolarMensaje } from "../../../utils/stringInterpolator";

describe("test sobre la creacion de mensajes para las notificaciones con el factory de notificaciones", () => {
  //Factorys
  const factoryNotificacionEspaniol = new FactoryNotificacion();
  const factoryNotificacionIngles = new FactoryNotificacion("en");
  //Users
  const comprador = new Usuario("jorge", TipoUsuario.COMPRADOR);
  const vendedor = new Usuario("andrea", TipoUsuario.VENDEDOR);
  const admin = new Usuario("chad", TipoUsuario.ADMIN);
  //Address
  const domicilio = new Domicilio("calle falsa", "1234");
  domicilio.setCodigoPostal("1408");
  domicilio.setDepartamento("B");
  domicilio.setPiso("2");
  const pais = new Pais("Argentina");
  const provincia = new Provincia("CABA", pais);
  const ciudad = new Ciudad("Caba", provincia);
  const coordenadas = new Coordenada(123, 123);
  const direccion = new DireccionEntrega(domicilio, ciudad, coordenadas);
  //Producto
  const producto = new Producto(vendedor, "Remera roja");
  producto.setPrecio(50);
  producto.setMoneda(Moneda.PESO_ARG);
  //Pedidos
  const itemPedido = new ItemPedido(producto, 2, 50);
  const pedido = new Pedido(comprador, Moneda.PESO_ARG, direccion);
  pedido.agregarItem(itemPedido);
  const estadoPendiente = EstadoPedido.PENDIENTE;

  test("Mensaje cuando el estado del pedido no es uno válido del enum", () => {
    const estadoPedidoFalso =
      "no soy un estado de pedido, pero tengo la dignidad de reconocerlo";
    expect(() => {
      factoryNotificacionEspaniol.crearSegunEstadoPedido(estadoPedidoFalso);
    }).toThrow(
      Error("El estado del pedido no corresponde con un objeto de su clase")
    );
  });
  test("Mensaje cuando el estado del pedido es uno válido", () => {
    const mensajeEspaniol =
      factoryNotificacionEspaniol.crearSegunEstadoPedido(estadoPendiente);
    const mensajeIngles =
      factoryNotificacionIngles.crearSegunEstadoPedido(estadoPendiente);
    expect(mensajeEspaniol).toBe(
      "Nuevo pedido {id} realizado por {nombreComprador}.\nItems:\n{items}\nTotal: $ {total}\nDirección de entrega: {calle} {altura}, {piso} {departamento}. CP {codigoPostal}. {ciudad}, {provincia}, {pais}."
    );
    expect(mensajeIngles).toBe(
      "New order {id} placed by {nombreComprador}.\nItems:\n{items}\nTotal: $ {total}\nDelivery address: {calle} {altura}, {piso} {departamento}. Zip {codigoPostal}. {ciudad}, {provincia}, {pais}."
    );
  });

  test("Cuando el pedido es correcto, las variables creadas tienen sentido", () => {
    const mensaje = factoryNotificacionEspaniol.crearVariablesMensaje(pedido);
    expect(mensaje).toEqual({
      id: undefined,
      nombreComprador: "jorge",
      total: 100,
      items: "- 2 x Remera roja",
      calle: "calle falsa",
      altura: "1234",
      piso: "2",
      departamento: "B",
      codigoPostal: "1408",
      ciudad: "Caba",
      provincia: "CABA",
      pais: "Argentina",
    });
  });

  test("Cuando el pedido es correcto, el mensaje se forma exitosamente", () => {
    const mensajeBase =
      factoryNotificacionEspaniol.crearSegunEstadoPedido(estadoPendiente);
    const variables = factoryNotificacionEspaniol.crearVariablesMensaje(pedido);
    const mensajeFinal = interpolarMensaje(mensajeBase, variables);
    expect(mensajeFinal).toEqual(`Nuevo pedido  realizado por jorge.
Items:
- 2 x Remera roja
Total: $ 100
Dirección de entrega: calle falsa 1234, 2 B. CP 1408. Caba, CABA, Argentina.`);
  });

  test("sin pedido no devuelve notificacion el factory", () => {
    const pedidoFalso = 123;
    expect(() => {
      factoryNotificacionEspaniol.crearSegunPedido(pedidoFalso);
    }).toThrow(Error);
  });

  test("notificacion exitosa con un pedido completo", () => {
    const notificacion = factoryNotificacionEspaniol.crearSegunPedido(pedido);
    const mensajeEsperado = `Nuevo pedido  realizado por jorge.
Items:
- 2 x Remera roja
Total: $ 100
Dirección de entrega: calle falsa 1234, 2 B. CP 1408. Caba, CABA, Argentina.`;
    const usuarioEsperado = vendedor;
    expect(notificacion.mensaje).toEqual(mensajeEsperado);
    expect(notificacion.usuarioDestino).toEqual(usuarioEsperado);
  });
});
