class ItemPedido {
    producto;
    cantidad;
    precioUnitario;

    constructor(producto, cantidad, precioUnitario) {
        this.producto = producto;
        this.cantidad = cantidad;
        this.precioUnitario = precioUnitario;
    }

    subTotal() {
        return this.precioUnitario * this.cantidad;
    }

    validarStock() {
        return this.producto.estaDisponible(this.cantidad);
    }
}

export default ItemPedido;