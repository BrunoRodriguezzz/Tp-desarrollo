import mongoose from "mongoose";
import Notificacion from "../models/entities/notificacion/notificacion";

const notificacionSchema = new mongoose.Schema({
  usuarioDestino: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UsuarioModel",
    required: true
  },
  mensaje: {
    type: String,
    required: true
  },
  fechaAlta: {
    type: Date,
    required: true,
    default: Date.now
  },
  leida: {
    type: Boolean,
    required: true,
    default: false
  }
}, {
  collection: 'notificaciones',  // <-- corregido
  toJSON: { virtuals: true },    // permite que los virtuals aparezcan al convertir a JSON
  toObject: { virtuals: true }   // permite que los virtuals aparezcan al convertir a objeto
});

notificacionSchema.virtual('id').get(function() {
  return this._id.toString();
});

notificacionSchema.loadClass(Notificacion);

export const NotificacionModel = mongoose.model('Notificacion', notificacionSchema);
