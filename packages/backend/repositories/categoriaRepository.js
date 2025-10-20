import CategoriaModel from "../schemas/categoriaSchema.js";

export default class CategoriaRepository {
    constructor() {
        this.model = CategoriaModel;
    }

    async findAll() {
        try {
            return await this.model.find();
        } catch (error) {
            console.error("Error al obtener categorías:", error);
            throw new Error("Error al obtener categorías");
        }
    }

    async save(categoriaData) {
        try {
            const nuevaCategoria = new this.model({
                nombre: categoriaData.nombre,
                cantidad: categoriaData.cantidad ?? 0, 
            });
            return await nuevaCategoria.save();
        } catch (error) {
            console.error("Error al guardar la categoría:", error);
            throw new Error("Error al guardar la categoría");
        }
    }

    async existeSimilar(nombre) {
        try {
            const regex = new RegExp(`^${nombre}$`, "i"); 
            const existente = await this.model.findOne({ nombre: regex });
            return !!existente;
        } catch (error) {
            console.error("Error al verificar categoría existente:", error);
            throw new Error("Error al verificar categoría existente");
        }
    }

    async findByNombre(nombre) {
        try {
            const categoria = await this.model.findOne({ nombre: nombre });
            return categoria;
        } catch (error) {
            console.error("Error al buscar categoría por nombre:", error);
            throw new Error("Error al buscar categoría por nombre");
        }
    }

    async existe(nombre) {
        try {
            const existente = await this.model.findOne({ nombre });
            return !! existente;
        } catch (error) {
            console.error("Error al verificar existencia de categoría:", error);
            throw new Error("Error al verificar existencia de categoría");
        }
    }

    async incrementarCantidad(nombre) {
        try {
            const categoriaActualizada = await this.model.findOneAndUpdate(
                { nombre },
                { $inc: { cantidad: 1 } }, 
                { new: true } 
            );
            return categoriaActualizada;
        } catch (error) {
            console.error("Error al incrementar cantidad:", error);
            throw new Error("Error al incrementar cantidad de la categoría");
        }
    }

    async decrementarCantidad(nombre) {
        try {
            const categoria = await this.model.findOne({ nombre });
            if (!categoria) return null;

            const nuevaCantidad = Math.max(0, categoria.cantidad - 1);
            categoria.cantidad = nuevaCantidad;
            return await categoria.save();
        } catch (error) {
            console.error("Error al decrementar cantidad:", error);
            throw new Error("Error al decrementar cantidad de la categoría");
        }
    }

    
}