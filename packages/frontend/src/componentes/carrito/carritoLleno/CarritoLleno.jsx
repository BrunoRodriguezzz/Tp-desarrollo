import React, { useState } from 'react'
import DetallePedido from './detallePedido/DetallePedido'
import ListaProductos from './listaProductos/ListaProductos'
import { useCart } from '../cartContext/CartContext';
import "./CarritoLleno.css"
import { SnackbarSuccess } from "../../snackbars/SnackBarSuccess.jsx"

export default function CarritoLleno() {
  const { addToCart, removeFromCart, cartItems, decreaseQuantity } = useCart();
  const [openSuccess, setOpenSuccess] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const handleSuccessClose = () => {
		setOpenSuccess(false);
	}

  const handleSnackBar = (mensaje) => {
    setOpenSuccess(false)
    setMensaje(mensaje);
    setTimeout(() => setOpenSuccess(true), 100)
  }

  const handleAdd = (product) => {
    addToCart(product)
    handleSnackBar('Se agrego el producto al carrito');
  }

  const handleRemove = (productId) => {
    removeFromCart(productId)
    handleSnackBar('Se removio el producto del carrito');
  }

  const handleDecrease = (productId) => {
    decreaseQuantity(productId)
    handleSnackBar('Se removio una unidad del carrito');
  }

  return (
    <div className='carrito-lleno-container'>
      <h2>Carrito de compras</h2>
      <div className='carrito-lleno-content'>
        <ListaProductos
          cartItems={cartItems}
          addToCart={handleAdd}
          removeFromCart={handleRemove}
          decreaseQuantity={handleDecrease}
        />
        <DetallePedido
          cartItems={cartItems}
          isCheckout={false}
        />
      </div>
      <SnackbarSuccess
					mensaje={mensaje}
					open={openSuccess}
					onClose={handleSuccessClose}
				/>
    </div>
  )
}
