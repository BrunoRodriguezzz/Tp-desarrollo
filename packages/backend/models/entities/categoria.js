export default class Categoria{
    constructor(nombre){
        if("uso de validador"){
            throw new Error('El nombre ingresado no corresponde a un dato de tipo string');
        }

        this.nombre = nombre
    }
} 