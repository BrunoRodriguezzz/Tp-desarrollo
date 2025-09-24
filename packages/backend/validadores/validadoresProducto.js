import Usuario from "../models/entities/usuario.js";
import { isString } from "./validadorTiposNativos.js";
import { ValidationError } from "../errors/tiendaSolError.js";
import { z } from "zod";

export function validar(vendedor, titulo) {
  if (vendedor == null || !(vendedor instanceof Usuario)) {
    throw new Error("Vendedor inválido");
  }

  if (titulo == null || !isString(titulo)) {
    throw new Error("Título inválido");
  }
}

export function validarParsearProducto(req) {
  const resultBody = productoSchema.safeParse(req.body);

  if (resultBody.error) {
    throw new ValidationError("Datos del producto inválidos");
  }

  return resultBody.data;
}

export function validarParsearUpdateProducto(req) {
  const resultBody = productoUpdateSchema.safeParse(req.body);

  if (resultBody.error) {
    throw new ValidationError("Datos del producto inválidos");
  }

  return resultBody.data;
}

const productoSchema = z.object({
  vendedor: z.number().min(1),
  titulo: z.string().min(3).max(50),
  descripcion: z.string().max(500).optional(),
  categorias: z.array(z.string()).optional(),
  precio: z.number().min(0).optional(),
  moneda: z.string().length(3).optional(),
});

const productoUpdateSchema = productoSchema.partial();