import axios from 'axios';
import { ValidationError } from '../errors/tiendaSolError';

export default class ConversionService {
  constructor() {
    this.cambios = null;
    this.ultimaActualizacion = null;
    this.INTERVALO_ACTUALIZACION = 60 * 60 * 1000; // 1 hora, ver cuanto poner
  }

  async fetchCambios() {
    const url = 'https://open.er-api.com/v6/latest/ARS';
    const response = await axios.get(url);
    this.rates = response.data.rates;
    this.lastUpdated = Date.now();
  }

  async actualizarCambios() {
    if (!this.rates || Date.now() - this.lastUpdated > this.UPDATE_INTERVAL) {
      await this.fetchCambios();
    }
  }

  async convertirAARS(monto, moneda) {
    await this.actualizarCambios();

    if (moneda === 'ARS') return monto;

    const rate = this.rates[moneda];
    if (!rate) throw new ValidationError('Moneda no soportada: ' + moneda);

    return monto / rate;
  }
}
