export default function filtrarPorPrecio(productos, maxPrice, minPrice = 0) {
  return productos.filter(
    (producto) => producto.precio >= minPrice && producto.precio <= maxPrice
  );
}
