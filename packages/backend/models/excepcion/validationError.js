export class ValidationError extends Error {
    constructor(message = 'Datos de validación inválidos') {  // se lanzara este mensaje por defecto si no se le pasa uno
        super(message);
        this.name = 'ValidationError';
    }
}