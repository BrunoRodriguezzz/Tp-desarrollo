class ItemPedido {
    constructor(producto, cantidad, precioUnitario) {
        this.producto = producto;
        this.cantidad = cantidad;
        this.precioUnitario = precioUnitario;
    }

    subTotal() {
        return this.precioUnitario * this.cantidad;
    }

    tieneStock() {
        //TODO - Producto
        return this.producto.estaDisponible(this.cantidad);
    }
}

module.exports = { ItemPedido }