export function pedidoToDTO(pedido) {
  return {
    id: pedido.id || pedido._id,
    comprador: {
      id: pedido.comprador.id || pedido.comprador._id,
      nombre: pedido.comprador.nombre,
      email: pedido.comprador.email,
      telefono: pedido.comprador.telefono,
      tipo: pedido.comprador.tipo,
      fechaAlta: pedido.comprador.fechaAlta?.toISOString(),
    },
    items: pedido.items.map((item) => ({
      producto: item.producto.id || item.producto._id,
      cantidad: item.cantidad,
      precioUnitario: item.precioUnitario,
    })),
    total: pedido.total,
    moneda: pedido.moneda,
    estado: pedido.estado,
    fechaCreacion: pedido.fechaCreacion?.toISOString(),
    vendedor: {
      vendedor: pedido.vendedor.id || pedido.vendedor._id,
      nombre: pedido.vendedor.nombre,
      email: pedido.vendedor.email,
      telefono: pedido.vendedor.telefono,
      tipo: pedido.vendedor.tipo,
      fechaAlta: pedido.vendedor.fechaAlta?.toISOString(),
    },
    //TODO - Usuario y motivo no salen
    direccion: pedido.direccion,
    historialEstados: pedido.historialEstados.map((h) => ({
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
