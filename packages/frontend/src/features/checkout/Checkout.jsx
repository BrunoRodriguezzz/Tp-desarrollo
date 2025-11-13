import { React, useState } from "react";
import "./Checkout.css";
import { useCart } from "../../componentes/carrito/cartContext/CartContext";
import FormularioContacto from "../../componentes/formularioContacto/FormularioContacto";
import DetallePedido from "../../componentes/carrito/carritoLleno/detallePedido/DetallePedido";
import Seo from "../../componentes/seo/Seo";

export default function Checkout() {
  const { cartItems } = useCart();
  const [direccion, setDireccion] = useState({
    calle: "",
    numero: "",
    ciudad: "",
    provincia: "",
    pais: "",
  });
  const [erroresDireccion, setErroresDireccion] = useState({});

  const validarDireccion = () => {
    const nuevosErrores = {};

    Object.keys(direccion).forEach((campo) => {
      if (!direccion[campo].trim()) {
        nuevosErrores[campo] = "Este campo es obligatorio";
      }
    });

    return nuevosErrores;
  };

  return (
    <div className="checkout-container">
      <Seo
        title="Finalizar compra | Tienda Sol"
        description="Completá tus datos y revisá tu pedido para finalizar la compra de forma segura."
      />
      <h1>Finalizar compra</h1>
      <p>¡Ya casi es tuyo!</p>
      <div className="checkout-content">
        <FormularioContacto
          direccion={direccion}
          setDireccion={setDireccion}
          errores={erroresDireccion}
          setErroresDireccion={setErroresDireccion}
        />
        <DetallePedido
          cartItems={cartItems}
          isCheckout={true}
          validarDireccion={validarDireccion}
          setErroresDireccion={setErroresDireccion}
        />
      </div>
    </div>
  );
}
