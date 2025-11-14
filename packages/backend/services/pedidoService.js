import Pedido from '../models/entities/pedido.js';
import ItemPedido from '../models/entities/itemPedido.js';
import DireccionEntrega from '../models/entities/ubicaciones/direccionEntrega.js';
import Pais from '../models/entities/ubicaciones/pais.js';
import Provincia from '../models/entities/ubicaciones/provincia.js';
import Ciudad from '../models/entities/ubicaciones/ciudad.js';
import Domicilio from '../models/entities/ubicaciones/domicilio.js';
import Coordenada from '../models/entities/ubicaciones/coordenada.js';
import EstadoPedido from '../models/enums/estadoPedido.js';
import { isMoneda } from '../validadores/validadorDeEnums.js';
import {
  validarComprador,
  validarVendedor,
  validarItemProducto,
  validarVendedorAutorizado,
  validarEstadoParaCancelar,
  validarPedido,
  validarEstadoParaEnviar,
  validarDireccion,
  validarCreacionPedido,
  validarCancelacionPedido,
  validarProducto,
} from '../validadores/validadoresPedido.js';
import { pedidoToDTO, usuarioToDTO } from '../utils/mappers.js';
import { validarString } from '../validadores/validadorTiposNativos.js';
import { paginationBuildResponse } from '../utils/pagination.js';

export default class PedidoService {
  constructor(PedidoRepository, UsuarioService, ProductoService, NotificacionService) {
    this.pedidoRepository = PedidoRepository;
    this.usuarioService = UsuarioService;
    this.productoService = ProductoService;
    this.notificacionService = NotificacionService;
  }

  async create(nuevoPedido, compradorId) {
    const { moneda, direccion, items } = nuevoPedido;
    validarCreacionPedido(compradorId, moneda, direccion, items);

    const comprador = await this.usuarioService.findById(compradorId);

    validarComprador(comprador, compradorId);
    isMoneda(moneda);
    validarDireccion(direccion);

    // creo direccion de entrega
    const direccionEntrega = this.crearDireccionEntrega(direccion);

    // instancio y valido los items del pedido
    const itemsValidados = [];

    for (const item of items) {
      const producto = await this.productoService.findById(item.productoId);
      validarProducto(producto, item.productoId);
      const nuevoItem = new ItemPedido(producto, item.cantidad, producto.precio);
      validarItemProducto(producto, nuevoItem);
      itemsValidados.push(nuevoItem);
    }

    // todos los items validados => instancio nuevo pedido
    const pedido = this.instanciarNuevoPedido(comprador, moneda, direccionEntrega, itemsValidados);

    // persisto nuevo pedido
    const pedidoPersistido = await this.pedidoRepository.save(pedido);

    // actualizo el stock del producto
    for (const item of itemsValidados) {
      item.producto.reducirStock(item.cantidad);
      item.producto.sumarVentas(item.cantidad);

      // Convertir a objeto plano antes de actualizar
      const productoPlano = Object.assign({}, item.producto);
      await this.productoService.update(item.producto.id, productoPlano, item.producto.vendedor.id);
    }


    await this.notificacionService.crearSegunPedido(pedidoPersistido);

    return pedidoToDTO(pedidoPersistido);
  }

  async cancel(pedidoCancelado) {
    const { compradorId, pedidoId, motivo } = pedidoCancelado;
    validarCancelacionPedido(compradorId, pedidoId, motivo);

    const comprador = await this.usuarioService.findById(compradorId);
    validarComprador(comprador, compradorId);

    const pedido = await this.pedidoRepository.findById(pedidoId);
    validarPedido(pedido, pedidoId);

    validarString(motivo);
    validarEstadoParaCancelar(pedido);

    pedido.actualizarEstado(EstadoPedido.CANCELADO, comprador, motivo);

    const pedidoPersistido = await this.pedidoRepository.update(pedido.id, pedido);

    const items = pedidoPersistido.items;

    for (const item of items) {
      const producto = await this.productoService.findById(item.producto._id);
      producto.aumentarStock(item.cantidad);
      producto.restarVentas(item.cantidad);

      // Convertir a objeto plano antes de actualizar
      const productoPlano = Object.assign({}, producto);
      await this.productoService.update(producto.id, productoPlano);
    }

    await this.notificacionService.crearSegunPedido(pedidoPersistido);

    return pedidoToDTO(pedidoPersistido);
  }

  async historialUsuario(usuarioId, page = 1, limit = 10) {
    const usuario = await this.usuarioService.findById(usuarioId);
    const esComprador = validarComprador(usuario, usuarioId);

    let paginado;
    if (esComprador) {
      paginado = await paginationBuildResponse(
        page,
        limit,
        null,
        async (page, elementosPorPagina, _filtros) => {
          const skip = (page - 1) * elementosPorPagina;
          const pedidos = await this.pedidoRepository.findAllByCompradorId(
            usuarioId,
            skip,
            elementosPorPagina
          );
          return pedidos.map(p => pedidoToDTO(p));
        }
      );

      paginado.total = await this.pedidoRepository.countByCompradorId(usuarioId);
    } else {
      paginado = await paginationBuildResponse(
        page,
        limit,
        null,
        async (page, elementosPorPagina, _filtros) => {
          const skip = (page - 1) * elementosPorPagina;
          const pedidos = await this.pedidoRepository.findAllByVendedorId(
            usuarioId,
            skip,
            elementosPorPagina
          );
          return pedidos.map(p => pedidoToDTO(p));
        }
      );

      paginado.total = await this.pedidoRepository.countByVendedorId(usuarioId);
    }

    paginado.calculateTotalPages();

    const usuarioDTO = usuarioToDTO(usuario);

    return {
      usuario: usuarioDTO,
      ...paginado,
    };
  }

  async marcarPedidoEnviado(pedidoEnviado) {
    const { vendedorId, pedidoId, motivo } = pedidoEnviado;

    const pedido = await this.pedidoRepository.findById(pedidoId);

    validarPedido(pedido, pedidoId);
    validarEstadoParaEnviar(pedido);
    validarString(motivo);

    const vendedor = await this.usuarioService.findById(vendedorId);
    validarVendedor(vendedor, vendedorId);
    validarVendedorAutorizado(pedido, vendedorId);

    pedido.actualizarEstado(EstadoPedido.ENVIADO, vendedor, motivo);

    const pedidoActualizado = await this.pedidoRepository.update(pedidoId, pedido);

    const pedidoDTO = pedidoToDTO(pedidoActualizado);
    const vendedorDTO = usuarioToDTO(vendedor);

    await this.notificacionService.crearSegunPedido(pedidoActualizado);

    return {
      pedido: pedidoDTO,
      vendedor: vendedorDTO,
    };
  }

  crearDireccionEntrega(direccion) {
    const { ciudad: ciudadData, domicilio: domicilioData, coordenada: coordenadaData } = direccion;
    const pais = new Pais(ciudadData.provincia.pais.nombre);
    const provincia = new Provincia(ciudadData.provincia.nombre, pais);
    const ciudad = new Ciudad(ciudadData.nombre, provincia);

    const domicilio = new Domicilio(domicilioData.calle, domicilioData.altura);
    if (domicilioData.piso) domicilio.setPiso(domicilioData.piso);
    if (domicilioData.departamento) domicilio.setDepartamento(domicilioData.departamento);
    if (domicilioData.codigoPostal) domicilio.setCodigoPostal(domicilioData.codigoPostal);

     let coordenada = null;
     if (coordenadaData && coordenadaData.latitud != null && coordenadaData.longitud != null) {
       coordenada = new Coordenada(coordenadaData.latitud, coordenadaData.longitud);
     }
    return new DireccionEntrega(domicilio, ciudad, coordenada);
  }

  instanciarNuevoPedido(comprador, moneda, direccionEntrega, itemsValidados) {
    const pedido = new Pedido(comprador, moneda, direccionEntrega);
    itemsValidados.forEach(item => {
      pedido.agregarItem(item);
    });

    return pedido;
  }

  async findByProduct(producto) {
    return await this.pedidoRepository.findByProduct(producto);
  }
}
