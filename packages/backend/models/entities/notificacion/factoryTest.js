// factoryTest.js
import FactoryNotificacion from "./factoryNotificacion.js";
import Pedido from "../pedido.js";
import ItemPedido from "../itemPedido.js";
import Producto from "../producto.js";
import Usuario from "../usuario.js";
import Moneda from "../../enums/moneda.js";
import TipoUsuario from "../../enums/tipoUsuario.js";

const vendedor = new Usuario(1, "Pepito Vendedor", TipoUsuario.VENDEDOR, "vendedor@tienda.com", "123456789");
const comprador = new Usuario(2, "Juan Pérez", TipoUsuario.COMPRADOR, "juan@gmail.com", "987654321");

const producto1 = new Producto(vendedor, "Camiseta");
producto1.setStock(10);
producto1.setActivo(true);

const producto2 = new Producto(vendedor, "Pantalon");
producto2.setStock(5);
producto2.setActivo(true);

const items = [
  new ItemPedido(producto1, 2, 1000),
  new ItemPedido(producto2, 1, 500)
];

const direccion = {
  domicilio: {
    calle: "Jose Bonifacio",
    altura: 742,
    piso: 3,
    departamento: "B",
    codigoPostal: "1424"
  },
  ciudad: {
    nombre: "CABA",
    provincia: {
      nombre: "Buenos Aires",
      pais: { nombre: "Argentina" }
    }
  }
};

const pedido = new Pedido(comprador, Moneda.PESO_ARG, direccion);

const factory = new FactoryNotificacion("en");

function probarEstado(estado) {
  pedido.estado = estado;
  const notificacion = factory.crearSegunPedido(pedido);

  console.log("====================================");
  console.log("Estado del pedido:", estado);
  console.log("Receptor:", notificacion.usuarioDestino); 
  console.log("Mensaje:\n", notificacion.mensaje);
  console.log("Fecha de notificación:", notificacion.fechaAlta);
  console.log("====================================\n");
}

["PENDIENTE", "ENVIADO", "CANCELADO"].forEach(probarEstado);
