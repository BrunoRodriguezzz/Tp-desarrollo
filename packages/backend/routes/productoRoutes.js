import express from "express";
import ProductoController from "../controllers/productoController.js";
import loggerMiddleware from "../middlewares/loggerModdleware.js";

const pathProductos = "/productos";

export default function healtCheckRoute(getController) {
  const router = express.Router();

  router.use(loggerMiddleware);

  router.post(pathProductos, async (req, res, next) => {
    try {
      await getController(ProductoController).create(req, res);
    } catch (err) {
      next(err);
    }
  });

  router.get(pathProductos, async (req, res, next) => {
    try {
      await getController(ProductoController).findAll(req, res, next);
    } catch (err) {
      next(err);
    }
  });

  router.get(pathProductos + "/vendedor/:id", async (req, res, next) => {
    try {
      await getController(ProductoController).findBySeller(req, res);
    } catch (err) {
      next(err);
    }
  });

  router.get(pathProductos + "/:id", async (req, res, next) => {
    try {
      await getController(ProductoController).findById(req, res);
    } catch (err) {
      next(err);
    }
  });

  router.patch(pathProductos + "/:id", (req, res) => {
    getController(ProductoController).update(req, res);
  });

  router.delete(pathProductos + "/:id", (req, res) => {
    getController(ProductoController).delete(req, res);
  });

  // Ya lo tenemos a nivel servidor
  // router.use(errorHandler);

  return router;
}
