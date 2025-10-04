import Usuario from "../../../models/entities/usuario";
import TipoUsuario from "../../../models/enums/tipoUsuario";
import NotificacionService from "../../../services/notificacionService";
import { jest, describe, test, expect, beforeEach } from '@jest/globals';

describe("tests sobre el servicio de notificaciones", ()=>{
    const usuario1 = {
        id: 1,
        nombre: "juan",
        email: "juan@gmail.com",
        telefono: 1234,
        tipo: TipoUsuario.COMPRADOR,
        fechaAlta: new Date()
    };
    const usuario2 = {
        id: 2,
        nombre: "andrea",
        email: "andrea@gmail.com",
        telefono: 5678,
        tipo: TipoUsuario.VENDEDOR,
        fechaAlta: new Date()
    };

    const usuario3 = {
        id: 3,
        nombre: "marcos",
        email: "marcos@gmail.com",
        telefono: 91011,
        tipo: TipoUsuario.COMPRADOR,
        fechaAlta: new Date()
    };

    const usuario4 = {
        id: 4,
        nombre: "lucia",
        email: "lucia@gmail.com",
        telefono: 121314,
        tipo: TipoUsuario.VENDEDOR,
        fechaAlta: new Date()
    };

    const notificacion1 = 
    {
        id: 1,
        usuarioDestino: usuario1,
        mensaje: "mensaje generico 1",
        fechaAlta: new Date(),
        leida: false
    }
    const notificacion2 = 
    {
        id: 2,
        usuarioDestino: usuario1,
        mensaje: "mensaje generico 2",
        fechaAlta: new Date(),
        leida: true
    }

    const mockRepoNotificaciones = {
        findAll: jest.fn()
    }
    const mockRepoPedidos = {
        
    }

    const notificacionService = new NotificacionService(mockRepoNotificaciones, mockRepoPedidos);

    test("service de obtener todas las notificaciones de un userId",async ()=>{
        mockRepoNotificaciones.findAll.mockResolvedValueOnce([
            notificacion1, notificacion2
        ])
        const notificaciones = await notificacionService.findAll(1)
        expect(notificaciones).toEqual([notificacion1,notificacion2])
    })
})