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
