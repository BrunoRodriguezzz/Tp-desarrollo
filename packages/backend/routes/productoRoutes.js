import express from "express";
import ProductoController from "../controllers/productoController.js";

const pathProductos = "/productos";

export default function healtCheckRoute(getController) {
  const router = express.Router();

  router.post(pathProductos, (req, res) =>
    getController(ProductoController).create(req, res)
  );

  router.get(pathProductos, (req, res) =>
    getController(ProductoController).findAll(req, res)
  );

  router.get(pathProductos + "/vendedor/:id", (req, res) =>
    getController(ProductoController).findBySeller(req, res)
  );

  return router;
}
