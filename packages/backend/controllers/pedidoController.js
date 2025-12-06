import { z } from 'zod';
import Moneda from '../models/enums/moneda.js';
import { paginationGetValues } from '../utils/pagination.js';
import withFotoUrls from '../utils/urlFotos.js';

export default class PedidoController {
  pedidoService;

  constructor(pedidoService) {
    this.pedidoService = pedidoService;
  }

  async create(req, res) {
    console.log('Llego a create');
    const body = req.body;
    console.log('Obtengo body');
    const resultBody = pedidoSchema.safeParse(body);

    console.log('Llego a hacer parse');
    if (resultBody.error) {
      res.status(400).json(resultBody.error.issues);
      return;
    }

    try {
      console.log('Llego al try');
      const nuevoPedido = await this.pedidoService.create(resultBody.data, req.user.id);
      return res.status(201).json(nuevoPedido);
    } catch (error) {
      return res.status(error.statusCode).json({ error: error.message });
    }
  }

  async cancel(req, res) {
    const data = {
      ...req.body,
      pedidoId: req.params.id,
      compradorId: req.user.id,
    };

    const result = cancelSchema.safeParse(data);

    if (result.error) {
      res.status(400).json(result.error.issues);
      return;
    }
    try {
      const pedidoCancelado = await this.pedidoService.cancel(result.data);
      res.status(200).json(pedidoCancelado);
    } catch (error) {
      return res.status(error.statusCode).json({ error: error.message });
    }
  }

  async getHistoryUser(req, res) {
    const data = {
      usuarioId: req.user.id,
    };

    const result = userHistorySchema.safeParse(data);

    if (result.error) {
      res.status(400).json(result.error.issues);
      return;
    }

    try {
      const pedidos = await paginationGetValues(req, async (page, limit, _filtros) => {
        return this.pedidoService.historialUsuario(data.usuarioId, page, limit);
      });

      if (!pedidos) {
        res.status(204).send('No se encontraron pedidos para ese usuario');
      }

      pedidos.data = (pedidos.data || []).map(pedido => {
        const itemsConFotos = (pedido.items || []).map(item => ({
          ...item,
          producto: withFotoUrls(req, item.producto),
        }));
        return { ...pedido, items: itemsConFotos };
      });

      res.status(200).json(pedidos);
    } catch (error) {
      const status = error.statusCode || 500;
      return res.status(status).json({ error: error.message });
    }
  }

  async marcarEnvio(req, res) {
    const data = {
      ...req.body,
      pedidoId: req.params.id,
      vendedorId: req.user.id,
    };

    const result = enviadoSchema.safeParse(data);

    if (result.error) {
      res.status(400).json(result.error.issues);
      return;
    }

    try {
      const pedidoEnviado = await this.pedidoService.marcarPedidoEnviado(result.data);
      res.status(200).json(pedidoEnviado);
    } catch (error) {
      return res.status(error.statusCode).json({ error: error.message });
    }
  }

  async findByProduct(req, res) {
    const productoId = req.params.id;
    try {
      const pedidos = await this.pedidoService.findByProduct(productoId);
      if (pedidos.length === 0) {
        return res.status(204).send('No se encontraron pedidos para ese producto');
      }
      return res.status(200).json(pedidos);
    } catch (error) {
      const status = error.statusCode || 500;
      return res.status(status).json({ error: error.message });
    }
  }
}

const objectIdRegex = /^[a-f\d]{24}$/i;

const enviadoSchema = z.object({
  vendedorId: z.string().regex(objectIdRegex, {
    message: 'Debe ser un ObjectId válido de MongoDB',
  }),
  pedidoId: z.string(),
  motivo: z.string().min(1),
});

const userHistorySchema = z.object({
  usuarioId: z.string().regex(objectIdRegex, {
    message: 'Debe ser un ObjectId válido de MongoDB',
  }),
});

export const pedidoSchema = z.object({
  /*
  compradorId: z.string().regex(objectIdRegex, {
    message: 'Debe ser un ObjectId válido de MongoDB',
  }),*/
  moneda: z.nativeEnum(Moneda),
  direccion: z.object({
    ciudad: z.object({
      nombre: z.string(),
      provincia: z.object({
        nombre: z.string(),
        pais: z.object({
          nombre: z.string(),
        }),
      }),
    }),
    domicilio: z.object({
      calle: z.string(),
      altura: z.string(),
      piso: z.string().optional(),
      departamento: z.string().optional(),
      codigoPostal: z.string().optional(),
    }),
    coordenada: z
      .object({
        latitud: z.number(),
        longitud: z.number(),
      })
      .optional(),
  }),
  items: z.array(
    z.object({
      productoId: z.string().regex(objectIdRegex, {
        message: 'Debe ser un ObjectId válido de MongoDB',
      }),
      cantidad: z.number().min(1),
    })
  ),
});

export const cancelSchema = z.object({
  compradorId: z.string().regex(objectIdRegex, {
    message: 'Debe ser un ObjectId válido de MongoDB',
  }),
  pedidoId: z.string().regex(objectIdRegex, {
    message: 'Debe ser un ObjectId válido de MongoDB',
  }),
  motivo: z.string().min(1),
});
