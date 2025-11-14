import axios from 'axios';
import { ValidationError } from '../errors/tiendaSolError.js';

const mapaMonedas = {
  PESO_ARG: 'ARS',
  DOLAR_USA: 'USD',
  EURO: 'EUR',
  REAL: 'BRL',
};

export default class ConversionService {
  constructor(productoService) {
    this.productoService = productoService;
    this.cambios = null;
    this.ultimaActualizacion = null;
    this.INTERVALO_ACTUALIZACION = 60 * 60 * 1000; // 1 hora, ver cuanto poner
  }

  async fetchCambios() {
    const url = 'https://open.er-api.com/v6/latest/ARS';
    const response = await axios.get(url);
    this.cambios = response.data.rates;
    this.ultimaActualizacion = Date.now();
  }

  async actualizarCambios() {
    if (!this.cambios || Date.now() - this.ultimaActualizacion > this.INTERVALO_ACTUALIZACION) {
      await this.fetchCambios();
    }
  }

  async convertirCarritoAARS(cart) {
    let total = 0;
    console.log('cart', cart);
    for (const c of cart) {
      const item = await this.productoService.findById(c.id);
      console.log('item', item);
      const precioARS = await this.convertirAARS(item.precio, item.moneda);
      total += precioARS * c.cantidad;
      console.log('subt', total);
    }
    return total;
  }

  async convertirAARS(monto, moneda) {
    await this.actualizarCambios();

    const monedaISO = mapaMonedas[moneda] || moneda;

    if (monedaISO === 'ARS') return monto;

    const cambio = this.cambios[monedaISO];
    if (!cambio) throw new ValidationError('Moneda no soportada: ' + moneda);

    return monto / cambio;
  }
}
