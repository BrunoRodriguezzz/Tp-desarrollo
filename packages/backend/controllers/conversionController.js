export default class ConversionController {
  conversionService;

  constructor(conversionService) {
    this.conversionService = conversionService;
  }

  async calcularTotal(req, res) {
    const cart = req.body.cart;
    const total = await this.conversionService.convertirCarritoAARS(cart);

    return res.status(200).json({ total });
  }
}
