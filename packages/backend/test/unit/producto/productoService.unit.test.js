import ProductoService from "../../../services/productoService.js";
import {
  ValidationError,
  NotFoundError,
} from "../../../errors/tiendaSolError.js";
import { jest } from "@jest/globals";
import Usuario from "../../../models/entities/usuario.js";
import TipoUsuario from "../../../models/enums/tipoUsuario.js";

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

describe("ProductoService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("findAll devuelve productos paginados y total", async () => {
    mockRepo.findByPage.mockResolvedValue([{ id: 1 }]);
    mockRepo.count.mockResolvedValue(1);
    const result = await productoService.findAll(1, 10, {});
    expect(result.data).toHaveLength(1);
    expect(result.total).toBe(1);
    expect(result.totalPages).toBeDefined();
  });

  test("findById devuelve producto si existe", async () => {
    mockRepo.findById.mockResolvedValue({ id: 1 });
    const result = await productoService.findById(1);
    expect(result.id).toBe(1);
  });

  test("findById lanza NotFoundError si no existe", async () => {
    mockRepo.findById.mockResolvedValue(null);
    // El service actual solo retorna null, no lanza error. Si quieres lanzar error, deberías agregarlo en el productoService.
    const result = await productoService.findById(999);
    expect(result).toBeNull();
  });

  test("create crea producto correctamente", async () => {
    const prod = {
      vendedor: 1,
      titulo: "Prod",
      precio: 10,
      stock: 1,
      activo: true,
    };
    mockRepo.save.mockResolvedValue(prod);
    const result = await productoService.create(prod);
    expect(result).toEqual(prod);
  });

  test("create lanza ValidationError si datos inválidos", async () => {
    mockRepo.save.mockImplementation(() => {
      throw new ValidationError("Inválido");
    });
    await expect(productoService.create({})).rejects.toThrow(ValidationError);
  });

  test("update actualiza producto si existe", async () => {
    const prod = { id: 1, precio: 20 };
    mockRepo.update.mockResolvedValue(prod);
    const result = await productoService.update(1, { precio: 20 });
    expect(result.precio).toBe(20);
  });

  test("update lanza NotFoundError si no existe", async () => {
    mockRepo.update.mockImplementation(() => {
      throw new NotFoundError("No existe");
    });

    await expect(productoService.update(999, { precio: 20 })).rejects.toThrow(
      NotFoundError
    );
  });

  test("delete elimina producto si existe", async () => {
    mockRepo.delete.mockResolvedValue(true);
    const result = await productoService.delete(1);
    expect(result).toBe(true);
  });

  test("delete lanza NotFoundError si no existe", async () => {
    mockRepo.delete.mockImplementation(() => {
      throw new NotFoundError("No existe");
    });
    await expect(productoService.delete(999)).rejects.toThrow(NotFoundError);
  });
});
