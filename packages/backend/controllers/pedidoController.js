import { z } from "zod";

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
    const resultId = idTransform.safeParse(req.params.id);

    if (resultId.error) {
      res.status(400).json(resultId.error.issues);
      return;
    }
    try {
      const pedidoCancelado = await this.pedidoService.cancel(resultId.data);
      res.status(200).json(pedidoCancelado);
    } catch (error) {
      return res.status(error.statusCode).json({ error: error.message });
    }
  }

  getHistoryUser(req, res) {
    const resultId = idTransform.safeParse(req.params.id);

    if (resultId.error) {
      res.status(400).json(resultId.error.issues);
      return;
    }

    const id = resultId.data.id;

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
    const resultId = idTransform.safeParse(req.params.id);

    if (resultId.error) {
      res.status(400).json(resultId.error.issues);
      return;
    }

    const id = resultId.data.id;
    const body = req.body;
    const resultBody = enviadoSchema.safeParse(body);

    try {
      const pedidoEnviado = await this.pedidoService.marcarPedidoEnviado(
        id,
        resultBody.data
      );
      res.status(200).json(pedidoEnviado);
    } catch (error) {
      return res.status(error.statusCode).json({ error: error.message });
    }
  }
}

const idTransform = z.string().transform((val, ctx) => {
  const num = Number(val);
  if (isNaN(num)) {
    ctx.addIssue({
      code: "INVALID_ID",
      message: "id must be a number",
    });
    return z.NEVER;
  }
  return num;
});

const enviadoSchema = z.object({
  idVendedor: z.number(),
  motivo: z.string(),
});

export const pedidoSchema = z.object({
  compradorId: z.number(),
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
      altura: z.number(),
      piso: z.number().optional(),
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
      productoId: z.number(),
      cantidad: z.number().min(1),
    })
  ),
});
