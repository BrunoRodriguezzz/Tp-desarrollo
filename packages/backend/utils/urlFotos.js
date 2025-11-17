export default function withFotoUrls(req, producto) {
  if (!producto) return producto;
  const base = process.env.PHOTOS_PATH || 'https://tiendasolapi.syspa.es/fotosProductos/';
  // const base = process.env.PHOTOS_PATH || 'http://localhost:8000/fotosProductos/';
  const fotos = Array.isArray(producto.fotos)
    ? producto.fotos.map(f => (typeof f === 'string' && !f.startsWith('http') ? base + f : f))
    : [];
  try {
    const plain = typeof producto.toObject === 'function' ? producto.toObject() : { ...producto };
    return { ...plain, fotos };
  } catch {
    return { ...producto, fotos };
  }
}
