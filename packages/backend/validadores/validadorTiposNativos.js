import { ValidationError } from "../models/excepcion/validationError.js";

export const isString = (valor) => {
  return typeof valor === "string";
};

export const isNumber = (valor) => {
  return typeof valor === "number";
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
  if (!isString(valor) || valor.trim() === "") {
    throw new ValidationError(`El campo '${nombreCampo}' debe ser una cadena no vacía`);
  }
}

export function validarNumeroPositivo(valor, nombreCampo) {
  if (!isNumber(valor) || valor <= 0) {
    throw new ValidationError(`El campo '${nombreCampo}' debe ser un número positivo`);
  }
}

export function validarNumeroPositivoMayorCero(valor, nombreCampo) {
  if (!isNumber(valor) || valor < 0) {
    throw new ValidationError(`El campo '${nombreCampo}' debe ser un número positivo mayor que cero`);
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
    throw new ValidationError("El campo 'telefono' debe ser un teléfono válido");
  }
}