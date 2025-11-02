import { jest } from '@jest/globals';
import UsuarioController from '../../../controllers/usuarioController.js';
import { BadRequestError } from '../../../errors/tiendaSolError.js';
import jwt from 'jsonwebtoken';

describe('UsuarioController', () => {
  const OLD_ENV = process.env;

  beforeAll(() => {
    process.env = { ...OLD_ENV };
    process.env.JWT_SECRET = 'test_access_secret_1234567890';
    process.env.JWT_REFRESH_SECRET = 'test_refresh_secret_1234567890';
    process.env.JWT_ISSUER = 'tiendasol';
    process.env.JWT_AUDIENCE = 'tiendasol_web';
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  const makeRes = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  test('login devuelve userDTO y tokens', async () => {
    const user = {
      id: 'u1',
      nombre: 'Ada',
      email: 'ada@example.com',
      telefono: '123',
      tipo: 'COMPRADOR',
    };

    const usuarioService = {
      authenticate: jest.fn().mockResolvedValue(user),
    };
    const authService = {
      generateToken: jest.fn().mockReturnValue('accessToken123'),
      generateRefreshToken: jest.fn().mockReturnValue('refreshToken456'),
    };

    const controller = new UsuarioController(usuarioService, authService);
    const req = { body: { email: 'ada@example.com', password: 'Secret0!' } };
    const res = makeRes();

    await controller.login(req, res);

    expect(usuarioService.authenticate).toHaveBeenCalledWith('ada@example.com', 'Secret0!');
    expect(authService.generateToken).toHaveBeenCalledWith(user);
    expect(authService.generateRefreshToken).toHaveBeenCalledWith(user);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      user: {
        id: 'u1',
        nombre: 'Ada',
        email: 'ada@example.com',
        telefono: '123',
        tipo: 'COMPRADOR',
      },
      token: 'accessToken123',
      refreshToken: 'refreshToken456',
    });
  });

  test('login con body faltante lanza BadRequestError', async () => {
    const controller = new UsuarioController({}, {});
    const req = { body: {} };
    const res = makeRes();

    await expect(controller.login(req, res)).rejects.toBeInstanceOf(BadRequestError);
  });

  test('refreshToken válido emite nuevo access token', async () => {
    const user = {
      id: 'u2',
      nombre: 'Grace',
      email: 'grace@example.com',
      telefono: '456',
      tipo: 'COMPRADOR',
    };

    const usuarioService = {
      findById: jest.fn().mockResolvedValue(user),
    };
    const authService = {
      generateToken: jest.fn().mockReturnValue('newAccess'),
      generateRefreshToken: jest.fn().mockReturnValue('newRefresh'),
    };

    // Creamos un refresh token válido para el user
    const refreshToken = jwt.sign(
      { sub: 'u2', nombre: 'Grace', email: 'grace@example.com', tipo: 'COMPRADOR' },
      process.env.JWT_REFRESH_SECRET,
      {
        algorithm: 'HS256',
        expiresIn: '1d',
        issuer: process.env.JWT_ISSUER,
        audience: process.env.JWT_AUDIENCE,
      }
    );

    const controller = new UsuarioController(usuarioService, authService);
    const req = { body: { refreshToken } };
    const res = makeRes();

    await controller.refreshToken(req, res);

    expect(usuarioService.findById).toHaveBeenCalledWith('u2');
    expect(authService.generateToken).toHaveBeenCalledWith(user);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      user: {
        id: 'u2',
        nombre: 'Grace',
        email: 'grace@example.com',
        telefono: '456',
        tipo: 'COMPRADOR',
      },
      token: 'newAccess',
    });
  });
});
