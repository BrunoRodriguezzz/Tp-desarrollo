import { Usuario } from "../usuario"
import { Categoria } from "../categoria"
import { Moneda } from "../../enums/moneda"
import { Builder } from "./productoBuilder"

class Producto {
    id;
    vendedor;
    titulo;
    descripcion;
    categorias;
    precio;
    moneda;
    stock;
    fotos;
    activo;

    constructor(builder) { // recibe el builder que tiene los datos que definamos.
        this.id = builder.id;
        this.vendedor = builder.vendedor;
        this.titulo = builder.titulo;

        // Opcionales
        this.descripcion = builder.descripcion || null; // Si el builder no tiene valor le asigna ese por defecto.
        this.categorias = builder.categorias || [];
        this.precio = builder.precio || 0;
        this.moneda = builder.moneda || null;
        this.stock = builder.stock || 0;
        this.fotos = builder.fotos || [];
        this.activo = builder.activo ?? true; // Si el builder no tiene valor le asigna ese por defecto.
    }

    // Builder estático
    static builder(id, vendedor, titulo) { // Es un método estático que devuelve la clase Builder
        return new Builder(Producto, id, vendedor, titulo);
    }

    estaDisponible(cantidad) {
        return this.activo && this.stock >= cantidad;
    }

    reducirStock(cantidad) {
        if (this.stock - cantidad < 0) {
            throw new Error("No hay stock suficiente");
        }
        this.stock -= cantidad;
    }

    aumentarStock(cantidad) {
        this.stock += cantidad;
    }
}

export { Producto };