import DireccionEntrega from "../models/entities/ubicaciones/direccionEntrega.js";
import EstadoPedido from "../models/enums/estadoPedido.js";
import {
  validarComprador,
  validarItemProducto,
  validarEstadoParaCancelar,
  validarPedido,
  validarEstadoParaEnviar,
} from "../validadores/validadoresPedido.js";
import { validarString } from "../validadores/validadorTiposNativos.js";

export default class PedidoService {
  constructor(PedidoRepository, UsuarioRepository, ProductoRepository) {
    this.pedidoRepository = PedidoRepository;
    this.usuarioRepository = UsuarioRepository;
    this.productoRepository = ProductoRepository;
  }

  async create(nuevoPedidoJSON) {
    const { compradorId, moneda, direccion, items } = nuevoPedidoJSON;

    const comprador = await this.usuarioRepository.findById(compradorId);
    validarComprador(comprador);

    const direccionEntrega = this.buildDireccionEntrega(direccion);

    const pedido = new Pedido(comprador, moneda, direccionEntrega);

    const itemsValidados = await Promise.all(
      items.map(async (item) => {
        const producto = await this.productoRepository.findById(
          item.productoId
        );
        validarItemProducto(producto, item);

        const itemPedido = new ItemPedido(producto, item.cantidad);
        return {
          itemPedido,
          producto,
          nuevaCantidad: producto.stock - item.cantidad,
        };
      })
    );

    for (const { itemPedido, producto, nuevaCantidad } of itemsValidados) {
      pedido.agregarItem(itemPedido);
      producto.stock = nuevaCantidad;
      await this.productoRepository.save(producto);
    }

    return await this.pedidoRepository.save(pedido);
  }

  buildDireccionEntrega(direccion) {
    const {
      ciudad: ciudadData,
      domicilio: domicilioData,
      coordenada: coordenadaData,
    } = direccion;
    const pais = new Pais(ciudadData.provincia.pais.nombre);
    const provincia = new Provincia(ciudadData.provincia.nombre, pais);
    const ciudad = new Ciudad(ciudadData.nombre, provincia);

    const domicilio = new Domicilio(domicilioData.calle, domicilioData.altura);
    if (domicilioData.piso) domicilio.setPiso(domicilioData.piso);
    if (domicilioData.departamento)
      domicilio.setDepartamento(domicilioData.departamento);
    if (domicilioData.codigoPostal)
      domicilio.setCodigoPostal(domicilioData.codigoPostal);

    const coordenada = new Coordenada(
      coordenadaData.latitud,
      coordenadaData.longitud
    );
    return new DireccionEntrega(domicilio, ciudad, coordenada);
  }

  async cancel(pedidoCanceladoJSON) {
    const comprador = await this.usuarioRepository.findById(
      pedidoCanceladoJSON.compradorId
    );
    validarComprador(comprador);

    const pedido = await this.pedidoRepository.findById(
      pedidoCanceladoJSON.pedidoId
    );
    validarPedido(pedido);

    validarString(pedidoCanceladoJSON.motivo);

    validarEstadoParaCancelar(pedido);

    pedido.actualizarEstado(EstadoPedido.CANCELADO, comprador, motivo);

    return await this.pedidoRepository.update(
      pedidoCanceladoJSON.pedidoId,
      pedido
    );
  }

  async historialUsuario(usuarioId) {
    const usuario = await this.usuarioRepository.findById(usuarioId);
    validarComprador(usuario);

    const pedidos = await this.pedidoRepository.findAllByUsuarioId(usuarioId);

    return {
      usuario: usuario,
      pedidos: pedidos,
    };
  }

  async marcarPedidoEnviado(idPedido, marcarEnvioJSON) {
    //TODO - Vendedor hay que verificar si es efectivamente el vendedor de ese producto (producto service que lo estan haciendo)
    const pedido = await this.pedidoRepository.findById(idPedido);
    validarPedido(pedido);
    validarEstadoParaEnviar(pedido);
    validarString(marcarEnvioJSON.motivo);

    const vendedor = await this.usuarioRepository.findById(
      marcarEnvioJSON.vendedor
    );
    validarVendedor(vendedor);

    pedido.actualizarEstado(
      EstadoPedido.ENVIADO,
      marcarEnvioJSON.vendedor,
      marcarEnvioJSON.motivo
    );

    const PedidoActualizado = await this.pedidoRepository.update(
      idPedido,
      pedido
    );

    return {
      pedido: PedidoActualizado,
      vendedor: vendedor,
    };
  }
}
