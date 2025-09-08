import dotenv from "dotenv"; // Dotenv es para variables de entorno (archivos .env)
dotenv.config();

export const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500; // Si no tiene un statusCode, es un error de servidor (500)
  err.status = err.status || "error"; // Si no tiene un status, es un error de servidor ("error")

  const entorno = process.env.NODE_ENV?.toLowerCase() || "development"; // Por defecto, si no está definido, es "development"
  console.log("Entorno: ", entorno);

  if (entorno === "development") {
    res.status(err.statusCode).json({
      error: err, // Muestra el error completo
      stack: err.stack, // Muestra el stack trace
    });
  } else {
    if (err.isOperational) {
      // Es un error conocido y manejado
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        timestamp: new Date().toISOString(),
      });
    } else {
      console.error("ERROR 💥", err);
      res.status(500).json({
        status: "error",
        message: "Algo salió mal", // Mensaje genérico para errores desconocidos
        timestamp: new Date().toISOString(),
      });
    }
  }
};
