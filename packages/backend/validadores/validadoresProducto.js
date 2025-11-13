import Usuario from '../models/entities/usuario.js';
import { isString } from './validadorTiposNativos.js';
import { ValidationError } from '../errors/tiendaSolError.js';
import { z } from 'zod';

export function validar(vendedor, titulo) {
  // Permite instancia de Usuario o documento Mongoose con campos requeridos
  if (
    vendedor == null ||
    (!(vendedor instanceof Usuario) &&
      !(typeof vendedor === 'object' && vendedor.nombre && vendedor.tipo))
  ) {
    throw new ValidationError('Vendedor inválido');
  }

  if (titulo == null || !isString(titulo) || titulo.trim().length < 3) {
    throw new ValidationError('Título inválido');
  }
}

export function validarParsearProducto(req) {
  const resultBody = productoSchema.safeParse(req.body);

  if (resultBody.error) {
    throw new ValidationError('Datos del producto inválidos');
  }

  if (!req.user || !req.user.id) {
    throw new ValidationError('Error de autenticacion');
  }
  const result = { ...resultBody.data, vendedor: req.user.id };

  return result;
}

export function validarParsearUpdateProducto(req) {
  const resultBody = productoUpdateSchema.safeParse(req.body);

  if (resultBody.error) {
    throw new ValidationError('Datos del producto inválidos');
  }

  return resultBody.data;
}

const objectIdRegex = /^[a-f\d]{24}$/i;
const productoSchema = z.object({
  /*
  vendedor: z.union([
    z.number().min(1),
    z.string().regex(objectIdRegex, {
      message: "Debe ser un ObjectId válido de MongoDB",
    }),
  ]),*/
  titulo: z.string().min(3).max(50),
  descripcion: z.string().max(500).optional(),
  categorias: z.array(z.string()).optional(),
  precio: z.number().min(0).optional(),
  moneda: z.string().min(3).max(10).optional(),
  stock: z.number().min(0).optional(),
  files: z.array(z.string()).optional(),
  activo: z.boolean().optional(),
});

const productoUpdateSchema = productoSchema.partial();
