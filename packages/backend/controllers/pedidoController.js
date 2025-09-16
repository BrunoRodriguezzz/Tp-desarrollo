import { z } from "zod";

export default class PedidoController {
  pedidoService;

  constructor(pedidoService) {
    this.pedidoService = pedidoService;
  }

  create(req, res) {
    const body = req.body;
    // const resultBody = pedidoSchema.safeParse(body); ver de hacer lo de schema

    if (body.error) {
      res.status(400).json(body.error.issues);
      return;
    }

    try {
      const nuevoPedido = this.pedidoService.create(body.data);
      return res.status(201).json(nuevoPedido);
    } catch (error) {
      if (error.isOperational) {
        return res.status(error.statusCode).json({ error: error.message });
      }
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  cancel(req, res) {
    const resultId = idTransform.safeParse(req.params.id);

    if (resultId.error) {
      res.status(400).json(resultId.error.issues);
      return;
    }

    const id = resultId.data;

    try {
      const pedidoCancelado = this.pedidoService.cancel(id);
      res.status(201).json(pedidoCancelado);
    } catch (error) {
      if (error.isOperational) {
        return res.status(error.statusCode).json({ error: error.message });
      }
      return res.status(500).json({ error: "Error interno del servidor" });
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
      res.status(201).json(pedidoEnviado);
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
