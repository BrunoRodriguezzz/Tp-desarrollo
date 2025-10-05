import { errorHandler } from "../../../middlewares/errorHandler.js";
import Server from "../../../server/server.js";
import express from "express";

export default function buildTestServer() {
  const app = express();
  const server = new Server(app);
  app.use(errorHandler);
  return server;
}
