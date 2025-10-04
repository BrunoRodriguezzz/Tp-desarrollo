import ItemPedido from "../models/entities/itemPedido.js";
import DireccionEntrega from "../models/entities/ubicaciones/direccionEntrega.js";
import EstadoPedido from "../models/enums/estadoPedido.js";
import { isMoneda } from "../validadores/validadorDeEnums.js";
import {
  validarComprador,
  validarItemProducto,
  validarEstadoParaCancelar,
  validarPedido,
  validarEstadoParaEnviar,
  validarDireccion,
  validarCreacionPedido,
  validarCancelacionPedido,
} from "../validadores/validadoresPedido.js";
import { toDTO } from "../utils/mappers.js";
import { validarString } from "../validadores/validadorTiposNativos.js";

export default class PedidoService {
  constructor(PedidoRepository, UsuarioRepository, ProductoRepository) {
    this.pedidoRepository = PedidoRepository;
    this.usuarioRepository = UsuarioRepository;
    this.productoRepository = ProductoRepository;
  }

  async create(nuevoPedido) {
    const { compradorId, moneda, direccion, items } = nuevoPedido;
    validarCreacionPedido(compradorId, moneda, direccion, items);

    const comprador = await this.usuarioRepository.findById(compradorId);

    validarComprador(comprador);
    isMoneda(moneda);
    validarDireccion(direccion);

    // creo direccion de entrega
    const direccionEntrega = this.crearDireccionEntrega(direccion);

    // instancio y valido los items del pedido
    const itemsValidados = [];
    for (const item of items) {
      const producto = await this.productoRepository.findById(item.productoId);
      const nuevoItem = new ItemPedido(
        producto,
        item.cantidad,
        producto.precio
      );
      validarItemProducto(producto, nuevoItem);
      itemsValidados.push(nuevoItem);
    }

    // todos los items validados => instancio nuevo pedido
    const pedido = instanciarNuevoPedido(
      comprador,
      moneda,
      direccionEntrega,
      itemsValidados
    );

    // persisto nuevo pedido
    const pedidoPersistido = await this.pedidoRepository.save(pedido);

    // actualizo el stock del producto
    for (const item of itemsValidados) {
      // VER COMO ACTUALIZARLO
    }

    return toDTO(pedidoPersistido); // armar funcion
  }

  async cancel(pedidoCancelado) {
    const { compradorId, pedidoId, motivo } = pedidoCancelado;
    validarCancelacionPedido(compradorId, pedidoId, motivo);

    const comprador = await this.usuarioRepository.findById(compradorId);
    validarComprador(comprador);

    const pedido = await this.pedidoRepository.findById(pedidoId);
    validarPedido(pedido);

    validarString(motivo);
    validarEstadoParaCancelar(pedido);

    pedido.actualizarEstado(EstadoPedido.CANCELADO, comprador, motivo);

    const pedidoPersistido = await this.pedidoRepository.update(
      pedido.id,
      pedido
    );

    return toDTO(pedidoPersistido);
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

  crearDireccionEntrega(direccion) {
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

  instanciarNuevoPedido(comprador, moneda, direccionEntrega, itemsValidados) {
    const pedido = new Pedido(comprador, moneda, direccionEntrega);
    itemsValidados.forEach((item) => {
      pedido.agregarItem(item);
    });
  }
}
