import mongoose from "mongoose";
import Categoria from "../models/entities/categoria.js";

const categoriaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  cantidad: {
    type: Number,
    required: true,
    default: 0
  }
}, {
  collection: 'categorias',
  versionKey: false,
});


categoriaSchema.loadClass(Categoria);

const CategoriaModel = mongoose.model('Categoria', categoriaSchema);

export default CategoriaModel;