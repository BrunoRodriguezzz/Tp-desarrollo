export function filtrarPorPrecio(productos, maxPrice, minPrice = 0) {
  return productos.filter(
    (producto) => producto.precio >= minPrice && producto.precio <= maxPrice
  );
}

export function filtrarPorVendedor(productos, vendedorId) {
  return productos.filter((producto) => producto.vendedor.id === vendedorId);
}

export function filtrarPorBusqueda(prodcutos, busqueda) {
  const busquedaLower = busqueda.toLowerCase();

  return prodcutos.filter(
    (producto) =>
      producto.titulo.toLowerCase().includes(busquedaLower) ||
      producto.categorias
        .map((c) => c.nombre.toLowerCase())
        .some((n) => n.includes(busquedaLower)) ||
      producto.descripcion.toLowerCase().includes(busquedaLower)
  );
}
