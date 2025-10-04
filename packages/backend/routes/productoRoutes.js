import express from "express";
import ProductoController from "../controllers/productoController.js";
import loggerMiddleware from "../middlewares/loggerModdleware.js";

const pathProductos = "/productos";

export default function healtCheckRoute(getController) {
  const router = express.Router();

  router.use(loggerMiddleware);

  // POST /productos
  router.post(pathProductos, async (req, res, next) => {
    try {
      await getController(ProductoController).create(req, res);
    } catch (err) {
      next(err);
    }
  });

  // GET /productos
  router.get(pathProductos, async (req, res, next) => {
    try {
      await getController(ProductoController).findAll(req, res, next);
    } catch (err) {
      next(err);
    }
  });

  // GET /productos/vendedor/:id
  router.get(pathProductos + "/vendedor/:id", async (req, res, next) => {
    try {
      await getController(ProductoController).findBySeller(req, res);
    } catch (err) {
      next(err);
    }
  });

  // GET /productos/:id
  router.get(pathProductos + "/:id", async (req, res, next) => {
    try {
      await getController(ProductoController).findById(req, res);
    } catch (err) {
      next(err);
    }
  });

  // PATCH /productos/:id
  router.patch(pathProductos + "/:id", async (req, res, next) => {
    try {
      await getController(ProductoController).update(req, res);
    } catch (err) {
      next(err);
    }
  });

  // DELETE /productos/:id
  router.delete(pathProductos + "/:id", async (req, res, next) => {
    try {
      await getController(ProductoController).delete(req, res);
    } catch (err) {
      next(err);
    }
  });

  return router;
}
