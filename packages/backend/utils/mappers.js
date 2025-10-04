export function toDTO(pedido) {
  return {
    id: pedido.id || pedido._id,
    comprador: {
      nombre: pedido.comprador.nombre,
      email: pedido.comprador.email,
      telefono: pedido.comprador.telefono,
      tipo: pedido.comprador.tipo,
      fechaAlta: pedido.comprador.fechaAlta.toISOString(),
    },
    items: pedido.items.map((item) => ({
      producto: item.producto.id || item.producto._id,
      cantidad: item.producto.cantidad,
      precioUnitario: item.producto.precioUnitario,
    })),
    total: pedido.total,
    moneda: pedido.moneda,
    estado: pedido.estado,
    fechaCreacion: pedido.fechaCreacion.toISOString(),
    vendedor: {
      nombre: pedido.vendedor.nombre,
      email: pedido.vendedor.email,
      telefono: pedido.vendedor.telefono,
      tipo: pedido.vendedor.tipo,
      fechaAlta: pedido.vendedor.fechaAlta.toISOString(),
    },
    direccion: pedido.direccion,
    historialEstados: pedido.historialEstados.map((h) => ({
      estado: h.estado,
      fecha: h.fecha.toISOString(),
      usuario: h.usuario.id || h.usuario._id,
      motivo: h.motivo,
    })),
  };
}
