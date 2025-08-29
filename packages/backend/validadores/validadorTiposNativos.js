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
  if (!isArray(valor)) return false;
  return valor.every((item) => typeof item === tipo);
};
