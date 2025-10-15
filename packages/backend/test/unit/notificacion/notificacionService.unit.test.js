import { jest, describe, test, expect, beforeEach } from '@jest/globals';
import NotificacionService from '../../../services/notificacionService.js';
import Notificacion from '../../../models/entities/notificacion/notificacion.js';
import { NotFoundError, ValidationError } from '../../../errors/tiendaSolError.js';
import EstadoPedido from '../../../models/enums/estadoPedido.js';

describe('NotificacionService', () => {
    let notificacionService;
    let mockNotificacionRepo;
    let mockPedidoRepo;

    beforeEach(() => {
        // Mock del repositorio de notificaciones
        mockNotificacionRepo = {
            findAll: jest.fn(),
            findAllByUserId: jest.fn(),
            findAllLeidas: jest.fn(),
            findAllNoLeidas: jest.fn(),
            findById: jest.fn(),
            marcarComoLeida: jest.fn(),
            save: jest.fn()
        };

        // Mock del repositorio de pedidos
        mockPedidoRepo = {
            findById: jest.fn()
        };

        // Instanciar servicio con mocks
        notificacionService = new NotificacionService(
            mockNotificacionRepo,
            mockPedidoRepo
        );
    });

    describe('findAll', () => {
        test('debe retornar todas las notificaciones', async () => {
            const mockNotificaciones = [
                { id: '1', mensaje: 'Test 1', leida: false },
                { id: '2', mensaje: 'Test 2', leida: true }
            ];

            mockNotificacionRepo.findAll.mockResolvedValue(mockNotificaciones);

            const resultado = await notificacionService.findAll();

            expect(resultado).toEqual(mockNotificaciones);
            expect(mockNotificacionRepo.findAll).toHaveBeenCalledTimes(1);
        });

        test('debe retornar array vacío si no hay notificaciones', async () => {
            mockNotificacionRepo.findAll.mockResolvedValue([]);

            const resultado = await notificacionService.findAll();

            expect(resultado).toEqual([]);
            expect(mockNotificacionRepo.findAll).toHaveBeenCalledTimes(1);
        });
    });

    describe('findAllUser', () => {
        test('debe retornar notificaciones de un usuario específico', async () => {
            const userId = '123';
            const mockNotificaciones = [
                { id: '1', usuarioDestino: userId, mensaje: 'Test 1', leida: false },
                { id: '2', usuarioDestino: userId, mensaje: 'Test 2', leida: true }
            ];

            mockNotificacionRepo.findAllByUserId.mockResolvedValue(mockNotificaciones);

            const resultado = await notificacionService.findAllUser(userId);

            expect(resultado).toEqual(mockNotificaciones);
            expect(mockNotificacionRepo.findAllByUserId).toHaveBeenCalledWith(userId);
            expect(mockNotificacionRepo.findAllByUserId).toHaveBeenCalledTimes(1);
        });

        test('debe retornar array vacío si el usuario no tiene notificaciones', async () => {
            const userId = '999';
            mockNotificacionRepo.findAllByUserId.mockResolvedValue([]);

            const resultado = await notificacionService.findAllUser(userId);

            expect(resultado).toEqual([]);
        });
    });

    describe('findAllLeidas', () => {
        test('debe retornar solo notificaciones leídas de un usuario', async () => {
            const userId = '123';
            const mockNotificacionesLeidas = [
                { id: '1', usuarioDestino: userId, mensaje: 'Test 1', leida: true },
                { id: '2', usuarioDestino: userId, mensaje: 'Test 2', leida: true }
            ];

            mockNotificacionRepo.findAllLeidas.mockResolvedValue(mockNotificacionesLeidas);

            const resultado = await notificacionService.findAllLeidas(userId);

            expect(resultado).toEqual(mockNotificacionesLeidas);
            expect(mockNotificacionRepo.findAllLeidas).toHaveBeenCalledWith(userId);
            expect(resultado.every(n => n.leida === true)).toBe(true);
        });
    });

    describe('findAllNoLeidas', () => {
        test('debe retornar solo notificaciones no leídas de un usuario', async () => {
            const userId = '123';
            const mockNotificacionesNoLeidas = [
                { id: '1', usuarioDestino: userId, mensaje: 'Test 1', leida: false },
                { id: '2', usuarioDestino: userId, mensaje: 'Test 2', leida: false }
            ];

            mockNotificacionRepo.findAllNoLeidas.mockResolvedValue(mockNotificacionesNoLeidas);

            const resultado = await notificacionService.findAllNoLeidas(userId);

            expect(resultado).toEqual(mockNotificacionesNoLeidas);
            expect(mockNotificacionRepo.findAllNoLeidas).toHaveBeenCalledWith(userId);
            expect(resultado.every(n => n.leida === false)).toBe(true);
        });
    });

    describe('marcarComoLeida', () => {
        test('debe marcar una notificación como leída', async () => {
            const notificacionId = '1';
            const mockNotificacion = {
                id: notificacionId,
                mensaje: 'Test',
                leida: false
            };

            mockNotificacionRepo.findById.mockResolvedValue(mockNotificacion);
            mockNotificacionRepo.marcarComoLeida.mockResolvedValue({
                ...mockNotificacion,
                leida: true
            });

            const resultado = await notificacionService.marcarComoLeida(notificacionId);

            expect(resultado.leida).toBe(true);
            expect(mockNotificacionRepo.findById).toHaveBeenCalledWith(notificacionId);
            expect(mockNotificacionRepo.marcarComoLeida).toHaveBeenCalledWith(
                expect.objectContaining({ leida: true })
            );
        });

        test('debe retornar null si la notificación no existe', async () => {
            const notificacionId = '999';
            mockNotificacionRepo.findById.mockResolvedValue(null);

            const resultado = await notificacionService.marcarComoLeida(notificacionId);

            expect(resultado).toBeNull();
            expect(mockNotificacionRepo.findById).toHaveBeenCalledWith(notificacionId);
            expect(mockNotificacionRepo.marcarComoLeida).not.toHaveBeenCalled();
        });
    });

    describe('crearSegunPedido', () => {
        test('debe lanzar NotFoundError si no se proporciona pedido', async () => {
            await expect(
                notificacionService.crearSegunPedido(null)
            ).rejects.toThrow(NotFoundError);

            await expect(
                notificacionService.crearSegunPedido(undefined)
            ).rejects.toThrow('No se ingresó ningún pedido para crear la notificación');
        });

        test('debe lanzar ValidationError si el pedido no es válido', async () => {
            const pedidoInvalido = { 
                id: 'p1',
                // No es un objeto Pedido válido
            };

            await expect(
                notificacionService.crearSegunPedido(pedidoInvalido)
            ).rejects.toThrow(ValidationError);
        });
    });
});