import mongoose from "mongoose";
import Producto from "../models/entities/producto.js";
import { isMoneda } from "../validadores/validadorDeEnums.js";

const ProductoSchema = new mongoose.Schema(
  {
    vendedor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
    titulo: { type: String, required: true },
    descripcion: { type: String, required: false },
    categorias: [{ type: String, required: false }],
    precio: { type: Number, required: false, min: 0 },
    moneda: {
      type: String,
      required: false,
      validate: {
        validator: function (value) {
          return isMoneda(value);
        },
        message: (props) => `${props.value} no es una moneda válida!`,
      },
    },
    stock: { type: Number, required: false },
    fotos: [{ type: String, required: false }],
    activo: { type: Boolean, required: false, default: true },
  },
  {
    timestamps: true,
    collection: "productos",
  }
);

ProductoSchema.loadClass(Producto);

const ProductoModel = mongoose.model("Producto", ProductoSchema);

export default ProductoModel;
