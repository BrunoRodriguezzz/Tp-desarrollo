import { z } from "zod";
import Moneda from "../models/enums/moneda.js";

export default class PedidoController {
  pedidoService;

  constructor(pedidoService) {
    this.pedidoService = pedidoService;
  }

  async create(req, res) {
    const body = req.body;
    const resultBody = pedidoSchema.safeParse(body);

    if (resultBody.error) {
      res.status(400).json(resultBody.error.issues);
      return;
    }

    try {
      const nuevoPedido = await this.pedidoService.create(resultBody.data);
      return res.status(201).json(nuevoPedido);
    } catch (error) {
      return res.status(error.statusCode).json({ error: error.message });
    }
  }

  async cancel(req, res) {
    const data = {
      ...req.body,
      pedidoId: req.params.id,
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
      usuarioId: req.params.id,
    };

    const result = userHistorySchema.safeParse(data);

    if (result.error) {
      res.status(400).json(result.error.issues);
      return;
    }

    const id = result.data.usuarioId;

    try {
      const pedidos = this.pedidoService.historialUsuario(id);

      if (pedidos === null) {
        res.status(204).send("No se encontraron pedidos para ese usuario");
      }

      res.status(200).json(pedidos);
    } catch (error) {
      return res.status(error.statusCode).json({ error: error.message });
    }
  }

  async marcarEnvio(req, res) {
    const data = {
      ...req.body,
      pedidoId: req.params.id,
    };

    const result = enviadoSchema.safeParse(data);

    if (result.error) {
      res.status(400).json(result.error.issues);
      return;
    }

    const id = result.data.pedidoId;
    const body = {
      vendedorId: result.data.vendedorId,
      motivo: result.data.motivo,
    };

    try {
      const pedidoEnviado = await this.pedidoService.marcarPedidoEnviado(
        id,
        body
      );
      res.status(200).json(pedidoEnviado);
    } catch (error) {
      return res.status(error.statusCode).json({ error: error.message });
    }
  }
}

const enviadoSchema = z.object({
  vendedorId: z.string(),
  pedidoId: z.string(),
  motivo: z.string().min(1),
});

const userHistorySchema = z.object({
  usuarioId: z.string(),
});

export const pedidoSchema = z.object({
  compradorId: z.string(),
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
    coordenada: z.object({
      latitud: z.number(),
      longitud: z.number(),
    }),
  }),
  items: z.array(
    z.object({
      productoId: z.string(),
      cantidad: z.number().min(1),
    })
  ),
});

export const cancelSchema = z.object({
  compradorId: z.string(),
  pedidoId: z.string(),
  motivo: z.string().min(1),
});
