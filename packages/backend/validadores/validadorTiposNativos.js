import { ValidationError } from "../errors/tiendaSolError.js";
import { z } from "zod";

export const isString = (valor) => {
  return typeof valor === "string";
};

export const isNumber = (valor) => {
  return !isNaN(valor) && typeof valor === "number";
};

export const isBoolean = (valor) => {
  return typeof valor === "boolean";
};

export const isUndefined = (valor) => {
  return typeof valor === "undefined";
};

export const isNull = (valor) => {
  return valor === null;
};

export const isArray = (valor) => {
  return Array.isArray(valor);
};

export const isArrayOf = (valor, tipo) => {
  if (!Array.isArray(valor)) return false;

  // Manejo de primitivos --> En teoría 5 instanceof Number da false, ocurre con los primitivos
  if (tipo === String) {
    return valor.every((item) => isString(item));
  }
  if (tipo === Number) {
    return valor.every((item) => isNumber(item));
  }
  if (tipo === Boolean) {
    return valor.every((item) => isBoolean(item));
  }

  // Para clases u otros constructores
  return valor.every((item) => item instanceof tipo);
};

export function validarString(valor, nombreCampo) {
  if (!isString(valor)) {
    throw new ValidationError(
      `El campo '${nombreCampo}' debe ser una cadena no vacía`
    );
  }
}

export function validarNumeroPositivo(valor, nombreCampo) {
  if (!isNumber(valor) || valor < 0) {
    throw new ValidationError(
      `El campo '${nombreCampo}' debe ser un número positivo`
    );
  }
}

export function validarNumeroPositivoMayorCero(valor, nombreCampo) {
  if (!isNumber(valor) || valor <= 0) {
    throw new ValidationError(
      `El campo '${nombreCampo}' debe ser un número positivo mayor que cero`
    );
  }
}

export function validarEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!isString(email) || !emailRegex.test(email)) {
    throw new ValidationError("El campo 'email' debe ser un email válido");
  }
}

export function validarTelefono(telefono) {
  const telefonoRegex = /^\d{10}$/;
  if (!isString(telefono) || !telefonoRegex.test(telefono)) {
    throw new ValidationError(
      "El campo 'telefono' debe ser un teléfono válido"
    );
  }
}

export function esEmailValido(cadena) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(cadena);
}

// Permite validar y parsear un ID que puede ser número positivo o un ObjectId de MongoDB
export function validarParsearID(id) {
  // Si viene un request, extraer el id de params
  const valor = typeof id === "object" && id?.params?.id ? id.params.id : id;
  const resultId = idFlexibleTransform.safeParse(valor);
  if (resultId.error) {
    throw new ValidationError("ID inválido");
  }
  return resultId.data;
}

// Acepta número positivo o string de 24 hex (ObjectId)
const objectIdRegex = /^[a-f\d]{24}$/i;
const idFlexibleTransform = z.string().transform((val, ctx) => {
  // Si es un número positivo
  const num = Number(val);
  if (!isNaN(num) && num >= 0 && String(num) === val) {
    return num;
  }
  // Si es un ObjectId válido
  if (objectIdRegex.test(val)) {
    return val;
  }
  ctx.addIssue({
    code: "INVALID_ID",
    message:
      "El id debe ser un número positivo o un ObjectId válido de MongoDB",
  });
  return z.NEVER;
});
