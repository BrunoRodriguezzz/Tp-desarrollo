import request from "supertest";
import { jest } from "@jest/globals";
import ProductoService from "../../services/productoService.js";
import ProductoController from "../../controllers/productoController.js";
import buildTestServer from "./utils/buildTestServer.js";
import productoRoutes from "../../routes/productoRoutes.js";
import TipoUsuario from "../../models/enums/tipoUsuario.js";
import Usuario from "../../models/entities/usuario.js";

const mockRepo = {
  findByPage: jest.fn(),
  count: jest.fn(),
  findById: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

const mockUsuarioService = {
  findById: jest.fn(),
};

const mockUsuario = new Usuario("Juan", TipoUsuario.VENDEDOR);
mockUsuario.id = "68e1d2ad1e349c4f60f53ca4";
mockUsuarioService.findById.mockResolvedValue(mockUsuario);

const productoService = new ProductoService(mockRepo, mockUsuarioService);
const productoController = new ProductoController(productoService);

const server = buildTestServer();
server.addRoute(productoRoutes);
server.setController(ProductoController, productoController);
server.configureRoutes();

describe("GET /productos", () => {
  test("caso exitoso", async () => {
    const sampleData = [
      {
        id: 1,
        vendedor: mockUsuario.id,
        titulo: "Prod1",
        precio: 100,
        stock: 10,
        activo: true,
      },
      {
        id: 2,
        vendedor: mockUsuario.id,
        titulo: "Prod2",
        precio: 200,
        stock: 5,
        activo: true,
      },
    ];
    mockRepo.findByPage.mockResolvedValue(sampleData);
    mockRepo.count.mockResolvedValue(2);

    const res = await request(server.app).get("/productos?page=1&limit=2");

    expect(res.status).toBe(200);
    expect(res.body.data).toHaveLength(2);
    expect(res.body.total).toBe(2);
    expect(res.body.data[0].titulo).toBe("Prod1");
  });

  test("devuelve no content si no hay productos", async () => {
    mockRepo.findByPage.mockResolvedValue([]);
    mockRepo.count.mockResolvedValue(0);
    const res = await request(server.app).get("/productos?page=1&limit=10");
    expect(res.status).toBe(204);
  });

  test("aplica filtros correctamente (por vendedor)", async () => {
    const filtered = [
      {
        id: 3,
        vendedor: mockUsuario.id,
        titulo: "Prod3",
        precio: 50,
        stock: 2,
        activo: true,
      },
    ];
    mockRepo.findByPage.mockResolvedValue(filtered);
    mockRepo.count.mockResolvedValue(1);
    const res = await request(server.app).get("/productos?vendedor=2");
    expect(res.status).toBe(200);
    expect(res.body.data).toHaveLength(1);
    expect(res.body.data[0].vendedor).toBe(mockUsuario.id);
  });

  test("falla con parámetros inválidos (400)", async () => {
    const res = await request(server.app).get("/productos?page=abc&limit=xyz");
    expect(res.status).toBe(400);
  });

  test("paginación funciona correctamente", async () => {
    const page1 = [
      {
        id: 1,
        vendedor: mockUsuario.id,
        titulo: "Prod1",
        precio: 100,
        stock: 10,
        activo: true,
      },
    ];
    mockRepo.findByPage.mockResolvedValueOnce(page1);
    mockRepo.count.mockResolvedValueOnce(2);
    const res = await request(server.app).get("/productos?page=1&limit=1");
    expect(res.status).toBe(200);
    expect(res.body.data).toHaveLength(1);
    expect(res.body.total).toBe(2);
  });
});

describe("POST /productos", () => {
  test("caso exitoso", async () => {
    const producto = {
      vendedor: mockUsuario.id,
      titulo: "Prod1",
      precio: 100,
      stock: 10,
      activo: true,
    };
    mockRepo.save.mockResolvedValue(producto);

    const res = await request(server.app)
      .post("/productos")
      .send({
        vendedor: mockUsuario.id,
        titulo: "Prod1",
        precio: 100,
        stock: 10,
        activo: true,
      })
      .set("Content-Type", "application/json");

    if (res.error) console.log(res.error);

    expect(res.status).toBe(201);
    expect(res.body).toEqual(producto);
  });

  test("falla con datos inválidos (400)", async () => {
    // Simula que el validador lanza error
    mockRepo.save.mockImplementation(() => {
      throw new Error("Datos inválidos");
    });
    const res = await request(server.app)
      .post("/productos")
      .send({
        vendedor: mockUsuario.id,
        titulo: "",
        precio: 100,
        stock: 10,
        activo: true,
      })
      .set("Content-Type", "application/json");
    expect(res.status).toBe(400);
  });

  test("falla con error inesperado (500)", async () => {
    mockRepo.save.mockImplementation(() => {
      throw new Error("Error inesperado");
    });
    const res = await request(server.app)
      .post("/productos")
      .send({
        vendedor: mockUsuario.id,
        titulo: "ProdX",
        precio: 100,
        stock: 10,
        activo: true,
      })
      .set("Content-Type", "application/json");
    expect([500, 400]).toContain(res.status); // depende de cómo manejes el error
  });
});

describe("GET /productos/:id", () => {
  test("caso exitoso", async () => {
    const producto = {
      id: 1,
      vendedor: mockUsuario.id,
      titulo: "Prod1",
      precio: 100,
      stock: 10,
      activo: true,
    };
    mockRepo.findById.mockResolvedValue(producto);

    const res = await request(server.app).get("/productos/" + mockUsuario.id);

    expect(res.status).toBe(200);
    expect(res.body.titulo).toBe("Prod1");
  });

  test("producto no encontrado (404)", async () => {
    mockRepo.findById.mockResolvedValue(null);
    const res = await request(server.app).get("/productos/999");
    expect(res.status).toBe(404);
  });

  test("falla con id inválido (400)", async () => {
    const res = await request(server.app).get("/productos/abc");
    expect(res.status).toBe(400);
  });
});

describe("PATCH /productos/:id", () => {
  test("caso exitoso", async () => {
    const productoActualizado = {
      id: 1,
      vendedor: mockUsuario.id,
      titulo: "Prod1",
      precio: 200,
      stock: 10,
      activo: true,
    };
    mockRepo.update.mockResolvedValue(productoActualizado);
    const res = await request(server.app)
      .patch("/productos/1")
      .send({ precio: 200 })
      .set("Content-Type", "application/json");
    expect(res.status).toBe(200);
    expect(res.body.precio).toBe(200);
  });

  test("producto no encontrado (404)", async () => {
    mockRepo.update.mockResolvedValue(null);
    const res = await request(server.app)
      .patch("/productos/999")
      .send({ precio: 200 })
      .set("Content-Type", "application/json");
    expect(res.status).toBe(404);
  });

  test("falla con id inválido (400)", async () => {
    const res = await request(server.app)
      .patch("/productos/abc")
      .send({ precio: 200 })
      .set("Content-Type", "application/json");
    expect(res.status).toBe(400);
  });

  test("falla con body inválido (400)", async () => {
    mockRepo.update.mockImplementation(() => {
      throw new Error("Datos inválidos");
    });
    const res = await request(server.app)
      .patch("/productos/1")
      .send({ precio: "no-numero" })
      .set("Content-Type", "application/json");
    expect(res.status).toBe(400);
  });

  test("falla con error inesperado (500)", async () => {
    mockRepo.update.mockImplementation(() => {
      throw new Error("Error inesperado");
    });
    const res = await request(server.app)
      .patch("/productos/1")
      .send({ precio: 123 })
      .set("Content-Type", "application/json");
    expect([500, 400]).toContain(res.status);
  });
});

describe("DELETE /productos/:id", () => {
  test("caso exitoso", async () => {
    mockRepo.delete.mockResolvedValue(true);
    const res = await request(server.app).delete("/productos/1");
    expect(res.status).toBe(204);
  });

  test("producto no encontrado (404)", async () => {
    mockRepo.delete.mockResolvedValue(false);
    const res = await request(server.app).delete("/productos/999");
    expect(res.status).toBe(404);
  });

  test("falla con id inválido (400)", async () => {
    const res = await request(server.app).delete("/productos/abc");
    expect(res.status).toBe(400);
  });

  test("falla con error inesperado (500)", async () => {
    mockRepo.delete.mockImplementation(() => {
      throw new Error("Error inesperado");
    });
    const res = await request(server.app).delete("/productos/1");
    expect([500, 400]).toContain(res.status);
  });
});
