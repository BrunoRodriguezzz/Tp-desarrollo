import React from 'react'
import DetallePedido from './detallePedido/DetallePedido'

export default function CarritoLleno(data) {
  return (
    
    <DetallePedido
      productos={data.productos}
      moneda = {"ARS"}
    />
  )
}
