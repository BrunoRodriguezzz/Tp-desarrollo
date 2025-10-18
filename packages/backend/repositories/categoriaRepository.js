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

    async existsSimilar(nombre) {
        try {
            const regex = new RegExp(`^${nombre}$`, "i"); 
            const existente = await this.model.findOne({ nombre: regex });
            return !!existente;
        } catch (error) {
            console.error("Error al verificar categoría existente:", error);
            throw new Error("Error al verificar categoría existente");
        }
    }
}