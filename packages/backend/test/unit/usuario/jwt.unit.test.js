import jwt from 'jsonwebtoken';
import { verifyAccessToken, verifyRefreshToken } from '../../../utils/jwt.js';

describe('utils/jwt', () => {
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

  test('verifyAccessToken returns payload for valid token', () => {
    const payload = { sub: 'u1', nombre: 'Ada', email: 'ada@example.com', tipo: 'COMPRADOR' };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      algorithm: 'HS256',
      expiresIn: '15m',
      issuer: process.env.JWT_ISSUER,
      audience: process.env.JWT_AUDIENCE,
    });

    const decoded = verifyAccessToken(token);
    expect(decoded.sub).toBe('u1');
    expect(decoded.nombre).toBe('Ada');
    expect(decoded.email).toBe('ada@example.com');
  });

  test('verifyRefreshToken returns payload for valid refresh token', () => {
    const payload = { sub: 'u2', nombre: 'Grace', email: 'grace@example.com', tipo: 'COMPRADOR' };
    const rtoken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      algorithm: 'HS256',
      expiresIn: '1d',
      issuer: process.env.JWT_ISSUER,
      audience: process.env.JWT_AUDIENCE,
    });

    const decoded = verifyRefreshToken(rtoken);
    expect(decoded.sub).toBe('u2');
  });

  test('verifyAccessToken throws on invalid token', () => {
    expect(() => verifyAccessToken('invalid.token.here')).toThrow();
  });
});
