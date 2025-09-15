import DireccionEntrega from "../models/entities/ubicaciones/direccionEntrega.js";
import EstadoPedido from "../models/enums/estadoPedido.js";
import {
  validarComprador,
  validarItemProducto,
  validarEstadoParaCancelar,
} from "../validadores/validadoresPedido.js";
import { validarString } from "../validadores/validadorTiposNativos.js";

export default class PedidoService {
  constructor(PedidoRepository, UsuarioRepository, ProductoRepository) {
    this.pedidoRepository = PedidoRepository;
    this.usuarioRepository = UsuarioRepository;
    this.productoRepository = ProductoRepository;
  }

  create(nuevoPedidoJSON) {
    const comprador = this.usuarioRepository.findById(
      nuevoPedidoJSON.compradorId
    );
    validarComprador(comprador);

    const pais = new Pais(
      nuevoPedidoJSON.direccion.ciudad.provincia.pais.nombre
    );
    const provincia = new Provincia(
      nuevoPedidoJSON.direccion.ciudad.provincia.nombre,
      pais
    );
    const ciudad = new Ciudad(
      nuevoPedidoJSON.direccion.ciudad.nombre,
      provincia
    );
    const domicilio = new Domicilio(
      nuevoPedidoJSON.direccion.domicilio.calle,
      nuevoPedidoJSON.direccion.domicilio.altura
    );

    if (nuevoPedidoJSON.direccion.domicilio.piso)
      domicilio.setPiso(nuevoPedidoJSON.direccion.domicilio.piso);
    if (nuevoPedidoJSON.direccion.domicilio.departamento)
      domicilio.setDepartamento(
        nuevoPedidoJSON.direccion.domicilio.departamento
      );
    if (nuevoPedidoJSON.direccion.domicilio.codigoPostal)
      domicilio.setCodigoPostal(
        nuevoPedidoJSON.direccion.domicilio.codigoPostal
      );

    const coordenada = new Coordenada(
      nuevoPedidoJSON.direccion.coordenada.latitud,
      nuevoPedidoJSON.direccion.coordenada.longitud
    );
    const direccionEntrega = new DireccionEntrega(
      domicilio,
      ciudad,
      coordenada
    );

    const pedido = new Pedido(
      comprador,
      nuevoPedidoJSON.moneda,
      direccionEntrega
    );

    for (const item of nuevoPedidoJSON.items) {
      const producto = this.productoRepository.findById(item.productoId);
      validarItemProducto(producto, item);
      const itemPedido = new ItemPedido(producto, item.cantidad);
      pedido.agregarItem(itemPedido);
    }

    items.forEach((item) => {
      const producto = this.productoRepository.findById(item.productoId);
      producto.stock -= item.cantidad;
      this.productoRepository.save(producto);
    });

    this.pedidoRepository.save(pedido);

    return pedido;
  }

  cancel(pedidoCanceladoJSON) {
    const comprador = this.usuarioRepository.findById(
      pedidoCanceladoJSON.compradorId
    );
    validarComprador(comprador);

    const pedido = this.pedidoRepository.findById(pedidoCanceladoJSON.pedidoId);
    validarPedido(pedido);

    validarString(pedidoCanceladoJSON.motivo);

    validarEstadoParaCancelar(pedido);

    pedido.actualizarEstado(EstadoPedido.CANCELADO, comprador, motivo);

    this.pedidoRepository.save(pedido);

    return pedido;
  }
}
