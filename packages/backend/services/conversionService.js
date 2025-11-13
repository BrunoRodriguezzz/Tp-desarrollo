import axios from 'axios';
import { ValidationError } from '../errors/tiendaSolError.js';

export default class ConversionService {
  constructor() {
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

  async convertirAARS(monto, moneda) {
    await this.actualizarCambios();

    if (moneda === 'ARS') return monto;

    const cambio = this.cambios[moneda];
    if (!cambio) throw new ValidationError('Moneda no soportada: ' + moneda);

    return monto / cambio;
  }
}
