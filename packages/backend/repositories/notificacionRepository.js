import NotificacionModel from "../schemas/notificacionSchema.js";

export default class NotificacionRepository {

  constructor() {
    this.model = NotificacionModel
  }

  async findById(id) {
    return await this.model.findById(id);
  }

  async findAll() {
    const notificaciones = await this.model.find({}).lean();

    const respuesta = await this.model.find() 
    return respuesta;
  }

  async findAllByUserId(userId) {
    return await this.model.find({usuarioDestino: userId});
  }

  async findAllLeidas(userId) {
    return await this.model.find({ 
    usuarioDestino: userId, 
    leida: true 
  });
  }

  async findAllNoLeidas(userId) {
    return await this.model.find({ 
    usuarioDestino: userId, 
    leida: false 
  });
  }

  async marcarComoLeida(notificacion) {
    const notificacionId = notificacion.id;
    await this.model.findByIdAndUpdate(
    notificacionId,
    { leida: true },
    { new: true } 
  )
  }

  async save(notificacion) {
    const usuarioDestino = notificacion.usuarioDestino.id;
    const mensaje = notificacion.mensaje;
    const fechaAlta = notificacion.fechaAlta;
    const leida = notificacion.leida
    const nuevaNotificacion = new NotificacionModel({
    usuarioDestino,
    mensaje,
    fechaAlta,
    leida
    });

  return await nuevaNotificacion.save();
  }
}
