class ItemPedido {
  producto;
  cantidad;
  precioUnitario;

  constructor(producto, cantidad, precioUnitario) {
    if (!isNumber(cantidad) && cantidad <= 0) {
      throw new ValidationError("La cantidad debe ser un número mayor a 0");
    }
    if (!isNumber(precioUnitario) && precioUnitario < 0) {
      throw new ValidationError(
        "La cantidad debe ser un número mayor o igual a 0"
      );
    }

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
