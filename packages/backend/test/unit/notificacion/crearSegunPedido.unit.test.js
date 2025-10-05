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
import Notificacion from "../../../models/entities/notificacion/notificacion";

describe("test sobre la creacion de notificaciones con el factory de notificacion y pedidos", () => {
  //Factorys
  const factoryNotificacionEspaniol = new FactoryNotificacion();
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
