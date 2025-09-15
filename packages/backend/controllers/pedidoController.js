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
