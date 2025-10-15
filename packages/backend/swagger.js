import swaggerUi from "swagger-ui-express";
// import swaggerJsdoc from "swagger-jsdoc";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

//TODO - Hay que ver si dejar lo de __filename o no, a mi sin eso no me funciona pero capaz se puede modificar algo para que si
export default async function swaggerDocs(app) {
  // Obtener ruta absoluta compatible con Windows
  const __filename = fileURLToPath(import.meta.url);
  /*const __dirname = path.dirname(
    new URL(import.meta.url).pathname.replace(/^\/+([A-Za-z]:)/, "$1")
  );*/
  const __dirname = path.dirname(__filename);
  const swaggerFile = path.resolve(__dirname, "swagger.yaml");
  const jsYaml = (await import("js-yaml")).default;
  const swaggerDocument = jsYaml.load(fs.readFileSync(swaggerFile, "utf8"));
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}
