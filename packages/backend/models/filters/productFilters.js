export function filtrarPorPrecio(productos, maxPrice, minPrice = 0) {
  return productos.filter(
    (producto) => producto.precio >= minPrice && producto.precio <= maxPrice
  );
}

export function filtrarPorVendedor(productos, vendedorId) {
  return productos.filter((producto) => producto.vendedor.id === vendedorId);
}
