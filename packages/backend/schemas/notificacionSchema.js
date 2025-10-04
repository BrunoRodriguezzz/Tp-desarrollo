import mongoose from "mongoose";
import Notificacion from "../models/entities/notificacion/notificacion.js";

const notificacionSchema = new mongoose.Schema({
  usuarioDestino: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
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
  collection: 'notificaciones',  
  toJSON: { virtuals: true },    
  toObject: { virtuals: true }  
});

notificacionSchema.virtual('id').get(function() {
  return this._id.toString();
});

notificacionSchema.loadClass(Notificacion);

const NotificacionModel = mongoose.model('Notificacion', notificacionSchema);

export default NotificacionModel;