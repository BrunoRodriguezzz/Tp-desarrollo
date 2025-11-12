import { jest } from '@jest/globals';
import PedidoService from '../../../services/pedidoService.js';
import Producto from '../../../models/entities/producto.js';
import Pedido from '../../../models/entities/pedido.js';
import Usuario from '../../../models/entities/usuario.js';
import { NotFoundError } from '../../../errors/tiendaSolError.js';
import EstadoPedido from '../../../models/enums/estadoPedido.js';
import TipoUsuario from '../../../models/enums/tipoUsuario.js';
import Pais from '../../../models/entities/ubicaciones/pais.js';
import Provincia from '../../../models/entities/ubicaciones/provincia.js';
import Ciudad from '../../../models/entities/ubicaciones/ciudad.js';
import Domicilio from '../../../models/entities/ubicaciones/domicilio.js';
import Coordenada from '../../../models/entities/ubicaciones/coordenada.js';
import DireccionEntrega from '../../../models/entities/ubicaciones/direccionEntrega.js';
import ItemPedido from '../../../models/entities/itemPedido.js';

const mockRepo = {
  save: jest.fn(),
  update: jest.fn(),
  findById: jest.fn(),
  findAllByCompradorId: jest.fn(),
  count: jest.fn(),
};

const mockUsuarioService = { findById: jest.fn() };
const mockProductoService = { findById: jest.fn(), update: jest.fn() };
const mockNotificacionService = { crearSegunPedido: jest.fn() };

const pedidoService = new PedidoService(
  mockRepo,
  mockUsuarioService,
  mockProductoService,
  mockNotificacionService
);

const pais = new Pais('Un país');
const provincia = new Provincia('Una provincia', pais);
const ciudad = new Ciudad('Una ciudad', provincia);
const domicilio = new Domicilio('Una calle', '123');
const coordenada = new Coordenada(-34, -58);
const direccionValida = new DireccionEntrega(domicilio, ciudad, coordenada);

const usuarioValido = new Usuario('Comprador Test', TipoUsuario.COMPRADOR);
usuarioValido._id = 'c1';
usuarioValido.email = 'c@test.com';
usuarioValido.telefono = '123456';

const vendedorValido = new Usuario('Vendedor Test', TipoUsuario.VENDEDOR);
vendedorValido._id = 'v1';
vendedorValido.email = 'v@test.com';
vendedorValido.telefono = '654321';

const productoValido = new Producto(vendedorValido, 'Un producto');
productoValido._id = 'p1';
productoValido.setStock(10);
productoValido.setPrecio(100);

describe('PedidoService', () => {
  beforeEach(() => jest.clearAllMocks());

  test('Crear', async () => {
    mockUsuarioService.findById.mockResolvedValue(usuarioValido);
    mockProductoService.findById.mockResolvedValue(productoValido);
    mockRepo.save.mockResolvedValue({
      _id: 'pedido1',
      total: 200,
      comprador: usuarioValido,
      items: [],
      fechaCreacion: new Date(),
      vendedor: vendedorValido,
      historialEstados: [],
    });

    await expect(
      pedidoService.create({
        compradorId: 'c1',
        moneda: 'PESO_ARG',
        direccion: direccionValida,
        items: [{ productoId: 'p1', cantidad: 2 }],
      })
    ).resolves.not.toThrow();
  });

  test('Crear - no existe el comprador', async () => {
    mockUsuarioService.findById.mockResolvedValue(null);

    await expect(
      pedidoService.create({
        compradorId: 'noExiste',
        moneda: 'PESO_ARG',
        direccion: direccionValida,
        items: [{ productoId: 'p1', cantidad: 2 }],
      })
    ).rejects.toThrow(NotFoundError);
  });

  test('Crear - no existe el producto', async () => {
    mockUsuarioService.findById.mockResolvedValue(usuarioValido);
    mockProductoService.findById.mockResolvedValue(null);

    await expect(
      pedidoService.create({
        compradorId: 'c1',
        moneda: 'PESO_ARG',
        direccion: direccionValida,
        items: [{ productoId: 'noExiste', cantidad: 2 }],
      })
    ).rejects.toThrow(NotFoundError);
  });

  test('Marcar como cancelado', async () => {
    const pedido = {
      _id: 'pedido1',
      estado: EstadoPedido.PENDIENTE,
      actualizarEstado: jest.fn(),
      comprador: usuarioValido,
      items: [],
      historialEstados: [],
      fechaCreacion: new Date(),
      vendedor: vendedorValido,
      direccion: null,
    };

    mockUsuarioService.findById.mockResolvedValue(usuarioValido);
    mockRepo.findById.mockResolvedValue(pedido);
    mockRepo.update.mockResolvedValue({
      ...pedido,
      estado: EstadoPedido.CANCELADO,
    });

    const result = await pedidoService.cancel({
      compradorId: 'c1',
      pedidoId: 'pedido1',
      motivo: 'Un motivo',
    });
    expect(result.estado).toBe(EstadoPedido.CANCELADO);
  });

  test('Marcar como cancelado - no existe el pedido', async () => {
    mockUsuarioService.findById.mockResolvedValue(usuarioValido);
    mockRepo.findById.mockResolvedValue(null);

    await expect(
      pedidoService.cancel({
        compradorId: 'c1',
        pedidoId: 'noExiste',
        motivo: 'Un motivo',
      })
    ).rejects.toThrow(NotFoundError);
  });

  test('Historial usuarios', async () => {
    const pedidos = [
      {
        _id: 'p1',
        comprador: usuarioValido,
        items: [],
        historialEstados: [],
        fechaCreacion: new Date(),
        vendedor: usuarioValido,
        direccion: null,
      },
    ];
    mockUsuarioService.findById.mockResolvedValue(usuarioValido);
    mockRepo.findAllByCompradorId.mockResolvedValue(pedidos);
    mockRepo.count.mockResolvedValue(1);

    const result = await pedidoService.historialUsuario('c1');
    expect(result.data).toHaveLength(1);
  });

  test('Historial usuarios - usuario no existe', async () => {
    mockUsuarioService.findById.mockResolvedValue(null);
    await expect(pedidoService.historialUsuario('noExiste')).rejects.toThrow(NotFoundError);
  });

  test('Marcar como enviado', async () => {
    const itemPedido = new ItemPedido(productoValido, 10, 10);
    const pedido = new Pedido(usuarioValido, 'PESO_ARG', direccionValida);
    pedido._id = 'p1';
    pedido.agregarItem(itemPedido);

    mockRepo.findById.mockResolvedValue(pedido);
    mockUsuarioService.findById.mockResolvedValue(vendedorValido);
    mockRepo.update.mockResolvedValue({
      ...pedido,
      estado: EstadoPedido.ENVIADO,
    });

    const result = await pedidoService.marcarPedidoEnviado('p1', {
      vendedorId: 'v1',
      motivo: 'Un motivo',
    });
    expect(result.pedido.estado).toBe(EstadoPedido.ENVIADO);
  });

  test('Marcar como enviado - no existe el pedido', async () => {
    mockRepo.findById.mockResolvedValue(null);
    await expect(
      pedidoService.marcarPedidoEnviado('noExiste', {
        vendedorId: 'v1',
        motivo: 'Un motivo',
      })
    ).rejects.toThrow(NotFoundError);
  });
});
