import { jest } from '@jest/globals';
import UsuarioService from '../../../services/usuarioService.js';
import bcrypt from 'bcryptjs';

describe('UsuarioService.authenticate', () => {
  test('devuelve usuario cuando password coincide', async () => {
    const plain = 'Secret0!';
    const passwordHash = await bcrypt.hash(plain, 10);
    const fakeUser = { id: 'u1', email: 'ada@example.com', passwordHash };

    const repo = {
      findByEmail: jest.fn().mockResolvedValue(fakeUser),
    };

    const service = new UsuarioService(repo);
    const result = await service.authenticate('ada@example.com', plain);

    expect(repo.findByEmail).toHaveBeenCalledWith('ada@example.com');
    expect(result).toBe(fakeUser);
  });

  test('devuelve null cuando password no coincide', async () => {
    const passwordHash = await bcrypt.hash('Secret0!', 10);
    const fakeUser = { id: 'u1', email: 'ada@example.com', passwordHash };

    const repo = {
      findByEmail: jest.fn().mockResolvedValue(fakeUser),
    };

    const service = new UsuarioService(repo);
    const result = await service.authenticate('ada@example.com', 'otraCosa');

    expect(result).toBeNull();
  });

  test('devuelve null si no existe el usuario', async () => {
    const repo = {
      findByEmail: jest.fn().mockResolvedValue(null),
    };
    const service = new UsuarioService(repo);
    const result = await service.authenticate('nadie@example.com', 'x');

    expect(result).toBeNull();
  });
});
