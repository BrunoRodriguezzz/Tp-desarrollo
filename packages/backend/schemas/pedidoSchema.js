import { mongoose } from "mongoose";
import { Pedido } from "../models/entities/pedido.js";
import { Moneda } from "../models/enums/moneda.js";
import { EstadoPedido } from "../models/enums/estadoPedido.js";

const PedidoSchema = new mongoose.Schema(
  {
    comprador: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },

    items: [
      {
        producto: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Producto",
          required: true,
        },
        cantidad: {
          type: Number,
          required: true,
          min: [1, "La cantidad de productos debe ser mayor a cero."],
        },
        precioUnitario: {
          type: Number,
          required: true,
          min: [1, "El precio unitario debe ser mayor a cero."],
        },
      },
    ],

    total: {
      type: Number,
      min: 0,
    },

    moneda: {
      type: String,
      enum: Object.values(Moneda),
      required: true,
    },

    direccion: {
      ciudad: {
        nombre: {
          type: String,
          trim: true,
          required: true,
        },
        provincia: {
          nombre: {
            type: String,
            trim: true,
            required: true,
          },
          pais: {
            nombre: {
              type: String,
              trim: true,
              required: true,
            },
          },
        },
      },
      domicilio: {
        calle: {
          type: String,
          trim: true,
          required: true,
        },
        altura: {
          type: Number,
          required: true,
        },
        piso: {
          type: Number,
        },
        departamento: {
          type: String,
          trim: true,
        },
        codigoPostal: {
          type: String,
          trim: true,
        },
      },
      coordenada: {
        latitud: {
          type: Number,
          required: true,
        },
        longitud: {
          type: Number,
          required: true,
        },
      },
    },

    estado: {
      type: String,
      enum: Object.values(EstadoPedido),
      default: EstadoPedido.PENDIENTE,
      required: true,
    },

    fechaCreacion: {
      type: Date,
      default: Date.now,
      required: true,
    },

    historialEstados: [
      {
        estado: {
          type: String,
          enum: Object.values(EstadoPedido),
          required: true,
        },
        fecha: {
          type: Date,
          default: Date.now,
          required: true,
        },
        usuario: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Usuario",
          required: true,
        },
        motivo: {
          type: String,
          trim: true,
          required: true,
        },
      },
    ],

    vendedor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "pedidos",
  }
);

PedidoSchema.pre("save", function (next) {
  if (this.isNew) {
    this.historialEstados.push({
      estado: this.estado,
      fecha: new Date(),
      usuario: this.comprador,
      motivo: "Pedido creado",
    });
  }

  next();
});

PedidoSchema.loadClass(Pedido);

export const PedidoModel = mongoose.model("Pedido", PedidoSchema);
