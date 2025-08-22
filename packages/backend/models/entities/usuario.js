import { esNoNuloNiUndefined } from "../../validadores/validador";
class Usuario {
    id;
    nombre;
    email;
    telefono;
    tipo;
    fechaAlta;

    constructor(id, nombre, tipo, email, telefono) {
        esNoNuloNiUndefined(this.constructor.name, id, nombre, tipo, email, telefono); // This.constructor.name permite que se pueda saber el nombre de la clase antes de que rompa por un valor nulo

        this.id = id;
        this.nombre = nombre;
        this.tipo = tipo;
        this.email = email;
        this.telefono = telefono;
        this.fechaAlta = new Date();
    }
}

export { Usuario };