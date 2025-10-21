import React from 'react'
import DetallePedido from './detallePedido/DetallePedido'
import ListaProductos from './listaProductos/ListaProductos'
import { useCart } from '../cartContext/CartContext';
import "./CarritoLleno.css"

export default function CarritoLleno() {
  const { addToCart, removeFromCart, cartItems, decreaseQuantity } = useCart();
  return (
    <div className='carrito-lleno-container'>
      <h2>Carrito de compras</h2>
      <div className='carrito-lleno-content'>
        <ListaProductos
          cartItems={cartItems}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          decreaseQuantity={decreaseQuantity}
        />
        <DetallePedido
          cartItems={cartItems}
        />
      </div>
    </div>
  )
}
