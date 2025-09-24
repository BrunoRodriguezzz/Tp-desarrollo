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

  router.get(pathProductos + "/:id", (req, res) =>
    getController(ProductoController).findById(req, res)
  );

  router.patch(pathProductos + "/:id", (req, res) =>
    getController(ProductoController).update(req, res)
  );

  router.delete(pathProductos + "/:id", (req, res) =>
    getController(ProductoController).delete(req, res)
  );

  return router;
}
