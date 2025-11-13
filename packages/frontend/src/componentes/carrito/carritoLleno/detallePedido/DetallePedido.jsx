import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./DetallePedido.css";
import PropTypes from "prop-types";
import { SnackbarSuccess } from "../../../snackbars/SnackBarSuccess";
import ConfirmDialog from "./ConfirmDialog";
import { crearPedido } from "../../../../services/pedidoService";
import { useSession } from "../../../../features/auth/session/sessionContext";
import CircularProgress from "@mui/material/CircularProgress";

export default function DetallePedido({ cartItems, isCheckout, campos = {} }) {
  const { accessToken } = useSession();
  const [total, setTotal] = useState(0);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { clearCart } = useCart();

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

  const camposCompletos = Object.values(campos)
    .filter((campo) => campo.requerido)
    .every((campo) => campo.valor.trim() !== "");

  const handleComprar = () => {
    if (isCheckout) {
      if (!camposCompletos) {
        //TODO - Pasarlo a Snackbar
        alert("Hay campos obligatorios (*) incompletos");
        return;
      }

      setOpenConfirm(true);
    } else {
      navigate("/checkout");
    }
  };

  const handleConfirmPurchase = async () => {
    setOpenConfirm(false);

    try {
      console.log("Entro al try");
      await crearPedido(accessToken, cartItems, campos);
    } catch (error) {
      //TODO - Pasarlo a Snackbar
      alert("Hubo un error");
    }

    setOpenSuccess(true);
  };

  const handleCancelConfirm = () => {
    setOpenConfirm(false);
  };

  const handleClose = () => {
    setOpenSuccess(false);
  };

  return (
    <>
      <div className="resumen-pedido">
        <h3>Resumen del pedido</h3>
        <div>
          <p>Subtotal</p>
          <p>${total.toFixed(2)}</p>
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
            ${total.toFixed(2)}
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

        <ConfirmDialog
          open={openConfirm}
          title="Confirmar compra"
          contentText="¿Estás seguro que deseas realizar la compra?"
          onCancel={handleCancelConfirm}
          onConfirm={handleConfirmPurchase}
        />

        <SnackbarSuccess
          mensaje="La compra se realizo correctamente"
          open={openSuccess}
          onClose={handleClose}
        />
      </div>

      {loading && (
        <div className="loading-overlay">
          <CircularProgress size={60} thickness={4} />
        </div>
      )}
    </>
  );
}

DetallePedido.propTypes = {
  cartItems: PropTypes.array.isRequired,
  isCheckout: PropTypes.bool,
  isFormValid: PropTypes.bool,
  validarDireccion: PropTypes.func,
  setErroresDireccion: PropTypes.func,
  campos: PropTypes.object,
};
