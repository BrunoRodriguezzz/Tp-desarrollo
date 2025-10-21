import React from 'react'
import CardProducto from '../cardProducto/CardProducto'
import "./ListaProductos.css"

export default function ListaProductos({cartItems, addToCart, removeFromCart, decreaseQuantity}) {
  return (
    <div className='lista-productos-container'>
        {cartItems.map((item) => (
            <CardProducto
              key={item._id} 
              nombre={item.titulo}
              categorias={item.categorias}
              precio={item.precio}
              cantidad={item.quantity}
              moneda={item.moneda}
              foto={item.fotos[0]}
              sumarUno={() => addToCart(item)}
              eliminarProducto={() => removeFromCart(item._id)}
              restarUno={() => decreaseQuantity(item._id)}
          />
        ))
        }
    </div>
  )
}
