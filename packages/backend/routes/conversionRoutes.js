import express from 'express';
import ConversionController from '../controllers/conversionController.js';

const pathConversion = '/conversion';

export default function conversionRoute(getController) {
  const router = express.Router();

  router.post(pathConversion, async (req, res, next) => {
    try {
      await getController(ConversionController).calcularTotal(req, res);
    } catch (err) {
      next(err);
    }
  });

  return router;
}
