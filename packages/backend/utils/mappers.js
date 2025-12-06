export function pedidoToDTO(pedido) {
  return {
    id: pedido.id || pedido._id,
    items: pedido.items
      .filter(item => item.producto != null)
      .map(item => ({
        producto: {
          _id: item.producto.id || item.producto._id,
          titulo: item.producto.titulo,
          descripcion: item.producto.descripcion,
          fotos: item.producto.fotos,
        },
        cantidad: item.cantidad,
        precioUnitario: item.precioUnitario,
      })),
    total: pedido.total,
    moneda: pedido.moneda,
    estado: pedido.estado,
    fechaCreacion: pedido.fechaCreacion?.toISOString(),
    direccion: pedido.direccion,
    historialEstados: pedido.historialEstados.map(h => ({
      estado: h.estado,
      fecha: h.fecha?.toISOString(),
      usuario: h.usuario?.id || h.usuario?._id,
      motivo: h.motivo,
    })),
  };
}

export function usuarioToDTO(usuario) {
  return {
    id: usuario.id || usuario._id,
    tipoUsuario: usuario.tipo,
    nombre: usuario.nombre,
    email: usuario.email,
    telefono: usuario.telefono,
    fechaAlta: usuario.fechaAlta?.toISOString(),
  };
}
