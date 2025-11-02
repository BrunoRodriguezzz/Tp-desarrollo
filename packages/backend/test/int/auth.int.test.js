import express from 'express';
import request from 'supertest';
import jwt from 'jsonwebtoken';
import { authMiddleware } from '../../middlewares/authMiddleware.js';
import { jest } from '@jest/globals';

describe('Auth middleware integration', () => {
  const OLD_ENV = process.env;
  let app;

  beforeAll(() => {
    process.env = { ...OLD_ENV };
    process.env.JWT_SECRET = process.env.JWT_SECRET || 'test_access_secret_1234567890';
    process.env.JWT_ISSUER = process.env.JWT_ISSUER || 'tiendasol';
    process.env.JWT_AUDIENCE = process.env.JWT_AUDIENCE || 'tiendasol_web';

    app = express();
    app.use(express.json());
    app.get('/secure', authMiddleware, (req, res) => {
      res.json({ ok: true, user: req.user });
    });
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  test('rechaza sin token (401)', async () => {
    const res = await request(app).get('/secure');
    expect(res.status).toBe(401);
  });

  test('acepta con token válido (200)', async () => {
    const token = jwt.sign(
      { sub: 'u100', nombre: 'Test', email: 't@example.com', tipo: 'COMPRADOR' },
      process.env.JWT_SECRET,
      {
        algorithm: 'HS256',
        expiresIn: '15m',
        issuer: process.env.JWT_ISSUER,
        audience: process.env.JWT_AUDIENCE,
      }
    );

    const res = await request(app).get('/secure').set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
    expect(res.body.user.id).toBe('u100');
    expect(res.body.user.tipo).toBe('COMPRADOR');
  });
});
