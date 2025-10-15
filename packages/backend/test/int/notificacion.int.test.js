import request from "supertest";
import { jest } from "@jest/globals";
import buildTestServer from "./utils/buildTestServer.js";
import NotificacionController from "../../controllers/notificacionController.js";
import NotificacionService from "../../services/notificacionService.js";
import notificacionRoute from "../../routes/notificacionRoutes.js";
import Usuario from "../../models/entities/usuario.js";
import TipoUsuario from "../../models/enums/tipoUsuario.js";
import Notificacion from "../../models/entities/notificacion/notificacion.js";

const compradorValido = new Usuario("Comprador Test", TipoUsuario.COMPRADOR);
compradorValido._id = "68e33be4b82c028126ef811e";

const vendedorValido = new Usuario("Vendedor Test", TipoUsuario.VENDEDOR);
vendedorValido._id = "68e33be4b82c028126ef811f";

const notificacionNoLeida = new Notificacion(
  vendedorValido,
  "Tienes un nuevo pedido"
);
notificacionNoLeida._id = "68e33be4b82c028126ef9001";
notificacionNoLeida.leida = false;

const notificacionLeida = new Notificacion(
  compradorValido,
  "Tu pedido fue enviado"
);
notificacionLeida._id = "68e33be4b82c028126ef901";
notificacionLeida.leida = true;

const mockRepo = {
  findAll: jest.fn(),
  findAllByUserId: jest.fn(),
  findAllLeidas: jest.fn(),
  findAllNoLeidas: jest.fn(),
  findById: jest.fn(),
  marcarComoLeida: jest.fn(),
};

const mockPedidoRepo = {};

const notificacionService = new NotificacionService(mockRepo, mockPedidoRepo);
const notificacionController = new NotificacionController(notificacionService);

const server = buildTestServer();
server.addRoute(notificacionRoute);
server.setController(NotificacionController, notificacionController);
server.configureRoutes();

describe("NotificacionController - Integración", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /notificaciones", () => {
    test("Debe devolver notificaciones no leídas de un usuario", async () => {
      mockRepo.findAllNoLeidas.mockResolvedValue([notificacionNoLeida]);

      const res = await request(server.app)
        .get("/notificaciones")
        .query({ userId: vendedorValido._id, leida: false });

      expect(res.status).toBe(200);
      expect(res.body.notificaciones).toHaveLength(1);
      expect(res.body.notificaciones[0].mensaje).toBe("Tienes un nuevo pedido");
    });

    test("Debe devolver notificaciones leídas de un usuario", async () => {
      mockRepo.findAllLeidas.mockResolvedValue([notificacionLeida]);

      const res = await request(server.app)
        .get("/notificaciones")
        .query({ userId: compradorValido._id, leida: true });

      expect(res.status).toBe(200);
      expect(res.body.notificaciones).toHaveLength(1);
      expect(res.body.notificaciones[0].leida).toBe(true);
    });

    test("Si query inválida, devuelve 400", async () => {
      const res = await request(server.app).get("/notificaciones").query({
        userId: "not-an-id",
        leida: "not-a-boolean",
      });

      expect(res.status).toBe(400);
    });
  });

  describe("PATCH /notificaciones/:id/leida", () => {
    test("Debe marcar como leída una notificación existente", async () => {
      mockRepo.findById.mockResolvedValue(notificacionNoLeida);
      mockRepo.marcarComoLeida.mockResolvedValue({
        ...notificacionNoLeida,
        leida: true,
      });

      const res = await request(server.app).patch(
        `/notificaciones/${notificacionNoLeida._id}/leida`
      );

      expect(res.status).toBe(200);
      expect(res.body.notificacion.leida).toBe(true);
    });

    test("Si la notificación no existe, devuelve 400", async () => {
      mockRepo.findById.mockResolvedValue(null);

      const res = await request(server.app).patch(
        `/notificaciones/68e33be4b82c028126ef999/leida`
      );

      expect(res.status).toBe(400);
    });

    test("Si el id es inválido, devuelve 400", async () => {
      const res = await request(server.app).patch(
        `/notificaciones/invalid-id/leida`
      );

      expect(res.status).toBe(400);
    });
  });
});