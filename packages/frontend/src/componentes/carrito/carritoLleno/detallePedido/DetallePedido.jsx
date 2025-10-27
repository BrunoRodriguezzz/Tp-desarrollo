import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./DetallePedido.css";
import PropTypes from "prop-types";
import { SnackbarSuccess } from "../../../snackbars/SnackBarSuccess"

export default function DetallePedido({ cartItems, isCheckout }) {
  const [total, setTotal] = useState(0);
  const [openSuccess, setOpenSuccess] = useState(false);
  const navigate = useNavigate();

  const convertirMoneda = (moneda) => {
    switch (moneda) {
      case "PESO_ARG":
        return "ARS";
      case "DOLAR":
        return "USD";
      case "EURO":
        return "EUR";
      default:
        return moneda;
    }
  };

  useEffect(() => {
    let sumaTotal = 0;
    cartItems.forEach((item) => {
      sumaTotal += item.precio * item.quantity;
    });
    setTotal(sumaTotal);
  }, [cartItems]);

  const handleComprar = () => {
    if(isCheckout) {
      setOpenSuccess(true);
    }
    else {
      navigate("/checkout")
    }
  }

  const handleClose = () => {
    setOpenSuccess(false);
  }

  return (
    <div className="resumen-pedido">
      <h3>Resumen del pedido</h3>
      <div>
        <p>Subtotal</p>
        <p>${total.toFixed(2) + " ARS"}</p>
      </div>
      <div>
        <p>Envío</p>
        <p>Gratis</p>
      </div>
      <div style={{ borderTop: "1px solid #eee" }}>
        <p style={{ color: "black", fontWeight: "bold", fontSize: "1.2rem" }}>
          Total
        </p>
        <p style={{ color: "black", fontWeight: "bold", fontSize: "1.2rem" }}>
          ${total.toFixed(2) + " ARS"}
        </p>
      </div>

      <div className={`resumen-botones ${isCheckout ? "single-btn" : ""}`}>
        <button onClick={handleComprar} className="btn-comprar">
          {isCheckout ? "Comprar" : "Finalizar compra"}
        </button>
        {isCheckout ? null : (
          <Link to="/productos" className="btn-continuar">
            Continuar comprando
          </Link>
        )}
      </div>
      <SnackbarSuccess
        mensaje="La compra se realizo correctamente"
        open={openSuccess}
        onClose={handleClose}
      />
    </div>
  );
}

DetallePedido.propTypes = {
  cartItems: PropTypes.array.isRequired,
  isCheckout: PropTypes.bool,
};
