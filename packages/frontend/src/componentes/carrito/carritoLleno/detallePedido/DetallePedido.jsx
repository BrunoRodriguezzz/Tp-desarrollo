import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./DetallePedido.css";
import PropTypes from "prop-types";
import { SnackbarSuccess } from "../../../snackbars/SnackBarSuccess";
import { SnackbarError } from "../../../snackbars/SnackBarError";
import ConfirmDialog from "./ConfirmDialog";
import { crearPedido } from "../../../../services/pedidoService";
import { useSession } from "../../../../features/auth/session/sessionContext";
import { useCart } from "../../cartContext/CartContext";

export default function DetallePedido({ cartItems, isCheckout, campos = {} }) {
  const { accessToken } = useSession();
  const { clearCart } = useCart();
  const [total, setTotal] = useState(0);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [errorMensaje, setErrorMensaje] = useState("");
  const [openConfirm, setOpenConfirm] = useState(false);
  const navigate = useNavigate();
  const redirectTimer = useRef(null);

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
        setErrorMensaje("Hay campos obligatorios (*) incompletos");
        setOpenError(true);
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
      setErrorMensaje("Hubo un error");
      setOpenError(true);
      return;
    }

    setOpenSuccess(true);

    redirectTimer.current = setTimeout(() => {
      clearCart();
      navigate("/");
    }, 2000);
  };

  useEffect(() => {
    return () => {
      if (redirectTimer.current) clearTimeout(redirectTimer.current);
    };
  }, []);

  const handleCancelConfirm = () => {
    setOpenConfirm(false);
  };

  const handleClose = () => {
    setOpenSuccess(false);
  };

  const handleCloseError = () => {
    setOpenError(false);
  };

  return (
    <div className="resumen-pedido">
      <h3>Resumen del pedido</h3>
      <div>
        <p>Subtotal</p>
        <p>AR$ {total.toFixed(2)}</p>
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
          AR$ {total.toFixed(2)}
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
      <SnackbarError
        mensaje={errorMensaje}
        open={openError}
        onClose={handleCloseError}
      />
    </div>
  );
}

DetallePedido.propTypes = {
  cartItems: PropTypes.array.isRequired,
  isCheckout: PropTypes.bool,
  campos: PropTypes.object,
};
