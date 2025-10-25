
import DetallePedido from "../../componentes/carrito/carritoLleno/detallePedido/DetallePedido"
import FormularioContacto from "../../componentes/formularioContacto/FormularioContacto"
import { useCart } from '../../componentes/carrito/cartContext/CartContext';

import "./Checkout.css"
export default function Checkout() {
  const { cartItems } = useCart();

  return (
    <div>
      <h1>Finalizar compra</h1>
      <p>¡Ya casi es tuyo!</p>
      <div>
        <FormularioContacto/>
        <DetallePedido
          cartItems={cartItems}
          isCheckout={true}
        />
      </div>        
    </div>
  )
}
