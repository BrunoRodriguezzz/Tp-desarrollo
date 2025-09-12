export class StockError extends Error {
    constructor(message = 'Error de stock') {  // se lanzara este mensaje por defecto si no se le pasa uno
        super(message);
        this.name = 'StockError';
    }
}