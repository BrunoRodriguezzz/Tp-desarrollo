import { React, useState } from "react";
import "./Checkout.css";
import { useCart } from "../../componentes/carrito/cartContext/CartContext";
import FormularioContacto from "../../componentes/formularioContacto/FormularioContacto";
import DetallePedido from "../../componentes/carrito/carritoLleno/detallePedido/DetallePedido";
import Seo from "../../componentes/seo/Seo";

export default function Checkout() {
  const { cartItems } = useCart();
  const inicializarCampo = (requerido = true) => ({ valor: "", requerido });

  const inicializarCampos = () => ({
    calle: inicializarCampo(),
    altura: inicializarCampo(),
    ciudad: inicializarCampo(),
    provincia: inicializarCampo(),
    pais: inicializarCampo(),
    piso: inicializarCampo(false),
    departamento: inicializarCampo(false),
    codigoPostal: inicializarCampo(false),
  });

  const [campos, setCampos] = useState(inicializarCampos());

  const setValorDe = (campo) => (event) => {
    setCampos((prev) => ({
      ...prev,
      [campo]: { ...prev[campo], valor: event.target.value },
    }));
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
        <FormularioContacto campos={campos} setValorDe={setValorDe} />
        <DetallePedido
          cartItems={cartItems}
          isCheckout={true}
          campos={campos}
        />
      </div>
    </div>
  );
}
