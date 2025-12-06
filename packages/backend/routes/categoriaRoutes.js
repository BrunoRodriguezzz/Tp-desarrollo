import express from "express";
import CategoriaController from "../controllers/categoriaController.js";

const pathCategoria = "/categorias";

export default function categoriaRoute(getController) {
  const router = express.Router();

  // GET /categorias
  router.get(pathCategoria, async (req, res, next) => {
    try {
      await getController(CategoriaController).findAll(req, res);
    } catch (err) {
      next(err);
    }
  });

  // POST /categorias
  router.post(pathCategoria, async (req, res, next) => {
    try {
      await getController(CategoriaController).save(req, res);
    } catch (err) {
      next(err);
    }
  });

  return router;
}
