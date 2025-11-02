export class TiendaSolError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode; // Código HTTP (ej: 404, 500)
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error"; // Determina si es un error del cliente (4xx = "fail") o del servidor (5xx = "error")
    this.isOperational = true; // Marca este error como "operacional" (predecible y manejable)
    Error.captureStackTrace(this, this.constructor); // Captura el stack trace excluyendo el constructor
  }
}

export class NotFoundError extends TiendaSolError {
  constructor(message = "Recurso no encontrado") {
    // Es el mensaje por defecto
    super(message, 404);
    this.name = "NotFoundError";
  }
}

export class ValidationError extends TiendaSolError {
  constructor(message = "Error de validación") {
    // Es el mensaje por defecto
    super(message, 400);
    this.name = "ValidationError";
  }
}

export class ConflictError extends TiendaSolError {
  constructor(message = "Error de conflicto") {
    // Es el mensaje por defecto
    super(message, 409);
    this.name = "ConflictError";
  }
}

export class CastError extends TiendaSolError {
  constructor(message = "Error de conversión de tipo") {
    // Es el mensaje por defecto
    super(message, 400);
    this.name = "CastError";
  }
}

export class BadRequestError extends TiendaSolError {
  constructor(message = "Solicitud incorrecta") {
    // Es el mensaje por defecto
    super(message, 400);
    this.name = "BadRequestError";
  }
}

export class WrongCredentialsError extends TiendaSolError {
  constructor(message = "Credenciales incorrectas") {
    // Es el mensaje por defecto
    super(message, 401);
    this.name = "WrongCredentialsError";
  }
}