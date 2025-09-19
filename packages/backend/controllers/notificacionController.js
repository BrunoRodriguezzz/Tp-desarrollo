import { z } from "zod";

export default class NotificacionController {
  notificacionService;

  constructor(notificacionService) {
    this.notificacionService = notificacionService;
  }

  findAll(req, res) {
    try {
      const querySchema = z.object({
        userId: idTransform,
        leida: booleanTransform,
      });

      const parsed = querySchema.safeParse(req.query);

      if (!parsed.success) {
        return res.status(400).json({ errors: parsed.error.issues });
      }

      const { userId, leida } = parsed.data;
      let notificaciones;

      if (!userId && leida === undefined) {
        notificaciones = this.notificacionService.findAll();
      } else if (leida !== undefined) {
        if (leida) {
          notificaciones = this.notificacionService.findAllLeidas(userId);
        } else {
          notificaciones = this.notificacionService.findAllNoLeidas(userId);
        }
      } else {
        notificaciones = this.notificacionService.findAllUser(userId);
      }

      return res.status(200).json({ notificaciones: notificaciones });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error al obtener notificaciones" });
    }
  }

  marcarComoLeida(req, res) {
    try {
      const parsed = idTransform.safeParse(req.params.id);

      if (!parsed.success) {
        return res
          .status(400)
          .json({ error: "El id debe ser un número válido" });
      }

      const id = parsed.data;

      const notificacion = this.notificacionService.marcarComoLeida(id);

      if (!notificacion) {
        return res.status(404).json({ error: "Notificación no encontrada" });
      }

      return res.status(200).json({
        message: "Notificación marcada como leída",
        notificacion: notificacion,
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "Error al marcar la notificación como leída" });
    }
  }

  crear(req, res) {
    const { pedidoId } = req.body;
    if (!pedido)
      return res.status(400).json({ error: "Debe enviarse un pedido" });

    try {
      const notificacion = this.service.crearSegunPedido(pedido);
      if (!notificacion)
        return res
          .status(400)
          .json({ error: "No se pudo generar notificación" });
      return res.status(201).json({ data: notificacion });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Error al crear la notificación" });
    }
  }
}

const idTransform = z
  .string()
  .transform((val, ctx) => {
    const num = Number(val);
    if (isNaN(num)) {
      ctx.addIssue({
        code: "custom",
        message: "userId must be a number",
      });
      return z.NEVER;
    }
    return num;
  })
  .optional();

const booleanTransform = z
  .string()
  .transform((val, ctx) => {
    if (val.toLowerCase() === "true") return true;
    if (val.toLowerCase() === "false") return false;
    ctx.addIssue({
      code: "custom",
      message: "leida must be 'true' or 'false'",
    });
    return z.NEVER;
  })
  .optional();
