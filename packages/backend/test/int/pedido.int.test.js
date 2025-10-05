import request from "supertest";
import { jest } from "@jest/globals";
import buildTestServer from "./utils/buildTestServer.js";
import PedidoController from "../../controllers/pedidoController.js";
import PedidoService from "../../services/pedidoService.js";
import Pedido from "../../models/entities/pedido.js";
import EstadoPedido from "../../models/enums/estadoPedido.js";
import Moneda from "../../models/enums/moneda.js";
import TipoUsuario from "../../models/enums/tipoUsuario.js";
import Usuario from "../../models/entities/usuario.js";
import Producto from "../../models/entities/producto.js";
import ItemPedido from "../../models/entities/itemPedido.js";
import Pais from "../../models/entities/ubicaciones/pais.js";
import Provincia from "../../models/entities/ubicaciones/provincia.js";
import Ciudad from "../../models/entities/ubicaciones/ciudad.js";
import Domicilio from "../../models/entities/ubicaciones/domicilio.js";
import Coordenada from "../../models/entities/ubicaciones/coordenada.js";
import DireccionEntrega from "../../models/entities/ubicaciones/direccionEntrega.js";
import pedidoRoute from "../../routes/pedidoRoutes.js";

const pais = new Pais("Un país");
const provincia = new Provincia("Una provincia", pais);
const ciudad = new Ciudad("Una ciudad", provincia);
const domicilio = new Domicilio("Una calle", "123");
const coordenada = new Coordenada(-34, -58);
const direccionValida = new DireccionEntrega(domicilio, ciudad, coordenada);

const compradorValido = new Usuario("Comprador Test", TipoUsuario.COMPRADOR);
compradorValido._id = "c1";
compradorValido.email = "c@test.com";
compradorValido.telefono = "123456";

const vendedorValido = new Usuario("Vendedor Test", TipoUsuario.VENDEDOR);
vendedorValido._id = "v1";
vendedorValido.email = "v@test.com";
vendedorValido.telefono = "123456";

const productoValido = new Producto(vendedorValido, "Un producto");
productoValido._id = "p1";
productoValido.setStock(10);
productoValido.setPrecio(100);

const itemValido = new ItemPedido(productoValido, 2, 100);

const pedidoValido = new Pedido(
  compradorValido,
  Moneda.PESO_ARG,
  direccionValida
);
pedidoValido._id = "p1";
pedidoValido.agregarItem(itemValido);

const mockRepo = {
  save: jest.fn(),
  update: jest.fn(),
  findById: jest.fn(),
  findAllByUsuarioId: jest.fn(),
};

const mockUsuarioService = {
  findById: jest.fn(),
};

const mockProductoService = {
  findById: jest.fn(),
  update: jest.fn(),
};

const mockNotificacionService = {
  crearSegunPedido: jest.fn(),
};

const pedidoService = new PedidoService(
  mockRepo,
  mockUsuarioService,
  mockProductoService,
  mockNotificacionService
);

const pedidoController = new PedidoController(pedidoService);

const server = buildTestServer();
server.addRoute(pedidoRoute);
server.setController(PedidoController, pedidoController);
server.configureRoutes();

describe("PedidoController - Integración", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /pedidos", () => {
    test("Crear - caso exitoso", async () => {
      mockUsuarioService.findById.mockResolvedValue(compradorValido);
      mockProductoService.findById.mockResolvedValue(productoValido);
      mockRepo.save.mockResolvedValue(pedidoValido);

      const res = await request(server.app)
        .post("/pedidos")
        .send({
          compradorId: "c1",
          moneda: Moneda.PESO_ARG,
          direccion: direccionValida,
          items: [{ productoId: "p1", cantidad: 2 }],
        })
        .set("Content-Type", "application/json");

      expect(res.status).toBe(201);
      expect(res.body.comprador.id).toBe("c1");
      expect(res.body.items).toHaveLength(1);
    });

    test("Crear - no existe el comprador", async () => {
      mockUsuarioService.findById.mockResolvedValue(null);

      const res = await request(server.app)
        .post("/pedidos")
        .send({
          compradorId: "noExiste",
          moneda: Moneda.PESO_ARG,
          direccion: direccionValida,
          items: [{ productoId: "p1", cantidad: 2 }],
        })
        .set("Content-Type", "application/json");

      expect(res.status).toBe(404);
    });

    test("Crear - no existe el producto", async () => {
      mockUsuarioService.findById.mockResolvedValue(compradorValido);
      mockProductoService.findById.mockResolvedValue(null);

      const res = await request(server.app)
        .post("/pedidos")
        .send({
          compradorId: "c1",
          moneda: Moneda.PESO_ARG,
          direccion: direccionValida,
          items: [{ productoId: "noExiste", cantidad: 2 }],
        })
        .set("Content-Type", "application/json");

      expect(res.status).toBe(404);
    });
  });

  describe("POST /pedidos/:id/cancelacion", () => {
    test("Marcar como cancelado - caso exitoso", async () => {
      const pedidoMock = { ...pedidoValido, actualizarEstado: jest.fn() };
      mockUsuarioService.findById.mockResolvedValue(compradorValido);
      mockRepo.findById.mockResolvedValue(pedidoMock);
      mockRepo.update.mockResolvedValue({
        ...pedidoMock,
        estado: EstadoPedido.CANCELADO,
      });

      const res = await request(server.app)
        .post("/pedidos/p1/cancelacion")
        .send({ compradorId: "c1", motivo: "Un motivo" })
        .set("Content-Type", "application/json");

      expect(res.status).toBe(200);
      expect(res.body.estado).toBe(EstadoPedido.CANCELADO);
    });

    test("Marcar como cancelado - no existe el pedido", async () => {
      mockUsuarioService.findById.mockResolvedValue(compradorValido);
      mockRepo.findById.mockResolvedValue(null);

      const res = await request(server.app)
        .post("/pedidos/noExiste/cancelacion")
        .send({ compradorId: "c1", motivo: "Un motivo" })
        .set("Content-Type", "application/json");

      expect(res.status).toBe(404);
    });
  });

  describe("GET /pedidos/usuarios/:id", () => {
    test("Historial usuarios - caso exitoso", async () => {
      mockUsuarioService.findById.mockResolvedValue(compradorValido);
      mockRepo.findAllByUsuarioId.mockResolvedValue([pedidoValido]);

      const res = await request(server.app).get("/pedidos/usuarios/c1");

      expect(res.status).toBe(200);
      expect(res.body.pedidos).toHaveLength(1);
    });

    test("Historial usuarios - usuario no existe", async () => {
      mockUsuarioService.findById.mockResolvedValue(null);

      const res = await request(server.app).get("/pedidos/usuarios/noExiste");

      expect(res.status).toBe(404);
    });
  });

  describe("POST /pedidos/:id/envio", () => {
    test("Marcar como enviado - caso exitoso", async () => {
      mockRepo.findById.mockResolvedValue(pedidoValido);
      mockUsuarioService.findById.mockResolvedValue(vendedorValido);
      mockRepo.update.mockResolvedValue({
        ...pedidoValido,
        estado: EstadoPedido.ENVIADO,
      });

      const res = await request(server.app)
        .post("/pedidos/p1/envio")
        .send({ vendedorId: "v1", motivo: "Un motivo" })
        .set("Content-Type", "application/json");

      expect(res.status).toBe(200);
      expect(res.body.pedido.estado).toBe(EstadoPedido.ENVIADO);
    });

    test("Marcar como enviado - no existe el pedido", async () => {
      mockRepo.findById.mockResolvedValue(null);

      const res = await request(server.app)
        .post("/pedidos/noExiste/envio")
        .send({ vendedorId: "v1", motivo: "Un motivo" })
        .set("Content-Type", "application/json");

      expect(res.status).toBe(404);
    });
  });
});
