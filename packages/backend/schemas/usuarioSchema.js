import { mongoose } from "mongoose";
import Usuario from "../models/entities/usuario.js";
import TipoUsuario from "../models/enums/tipoUsuario.js";

const UsuarioSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      trim: true,
      required: true,
    },

    email: {
      type: String,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "El email no es válido"],
    },

    telefono: {
      type: String,
      trim: true,
      match: [
        /^\d{7,15}$/,
        "El teléfono debe contener solo números y entre 7 y 15 dígitos",
      ],
    },

    tipo: {
      type: String,
      enum: Object.values(TipoUsuario),
      required: true,
    },

    fechaAlta: {
      type: Date,
      default: Date.now,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "usuarios",
  }
);

UsuarioSchema.loadClass(Usuario);

export const UsuarioModel = mongoose.model("Usuario", UsuarioSchema);
