
import DetallePedido from "../../componentes/carrito/carritoLleno/detallePedido/DetallePedido"
import FormularioContacto from "../../componentes/formularioContacto/FormularioContacto"
import { useCart } from '../../componentes/carrito/cartContext/CartContext';

import "./Checkout.css"
import { useState } from "react";
export default function Checkout() {
  const { cartItems } = useCart();
  const [direccion, setDireccion] = useState({
    calle: "",
    numero: "",
    ciudad: "",
    provincia: "",
    pais: "",
  });

  return (
    <div className="checkout-container">
      <h1>Finalizar compra</h1>
      <p>¡Ya casi es tuyo!</p>
      <div className="checkout-content">
        <FormularioContacto direccion={direccion} setDireccion={setDireccion}/>
        <DetallePedido cartItems={cartItems} isCheckout={true} />
      </div>
    </div>
  )
}
