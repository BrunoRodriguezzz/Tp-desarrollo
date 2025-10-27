import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./DetallePedido.css";
import PropTypes from "prop-types";
import { SnackbarSuccess } from "../../../snackbars/SnackBarSuccess";

export default function DetallePedido({ cartItems, isCheckout }) {
  const [total, setTotal] = useState(0);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
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
    if (isCheckout) {
      setOpenConfirm(true);
    } else {
      navigate("/checkout");
    }
  };

  const handleConfirmPurchase = () => {
    setOpenConfirm(false);
    setOpenSuccess(true);
  };

  const handleCancelConfirm = () => {
    setOpenConfirm(false);
  };

  const handleClose = () => {
    setOpenSuccess(false);
  };

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
      {/* Confirmation modal shown when user clicks Comprar in checkout */}
      {openConfirm && (
        <div className="confirm-overlay" role="dialog" aria-modal="true">
          <div className="confirm-dialog">
            <p className="confirm-message">
              ¿Estás seguro que deseas realizar la compra?
            </p>
            <div className="confirm-actions">
              <button className="btn-cancel" onClick={handleCancelConfirm}>
                Cancelar
              </button>
              <button className="btn-confirm" onClick={handleConfirmPurchase}>
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
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
