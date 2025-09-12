import swaggerUi from "swagger-ui-express";
// import swaggerJsdoc from "swagger-jsdoc";
import fs from "fs";
import path from "path";

export default async function swaggerDocs(app) {
  // Obtener ruta absoluta compatible con Windows
  const __dirname = path.dirname(
    new URL(import.meta.url).pathname.replace(/^\/+([A-Za-z]:)/, "$1")
  );
  const swaggerFile = path.resolve(__dirname, "swagger.yaml");
  const jsYaml = (await import("js-yaml")).default;
  const swaggerDocument = jsYaml.load(fs.readFileSync(swaggerFile, "utf8"));
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}
