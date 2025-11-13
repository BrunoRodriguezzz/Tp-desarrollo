export default class ConversionController {
  conversionService;

  constructor(conversionService) {
    this.conversionService = conversionService;
  }

  async calcularTotal(req, res) {
    const cart = req.body.cart;
    let total = 0;

    for (const item of cart) {
      const precioARS = await this.conversionService.convertirAARS(item.precio, item.moneda);
      total += precioARS * item.quantity;
    }

    return res.status(200).json({ total });
  }
}
