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
import CircularProgress from "@mui/material/CircularProgress";
import { obtenerTotal } from "../../../../services/conversionService";

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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const calcularTotal = async () => {
      if (cartItems.length === 0) {
        setTotal(0);
        return;
      }

      try {
        setLoading(true);
        console.log("cart", cartItems);
        const cartToSend = cartItems.map((item) => ({
          id: item._id,
          cantidad: item.quantity,
        }));

        const data = await obtenerTotal(cartToSend);

        setTotal(data.total);
      } catch (err) {
        console.error("Error obteniendo total:", err);
      } finally {
        setLoading(false);
      }
    };

    calcularTotal();
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
  setLoading(true);

  const subCarts = cartItems.reduce((acc, item) => {
  const vendedorId = item.vendedor._id;

  if (!acc[vendedorId]) {
    acc[vendedorId] = [];
  }
  acc[vendedorId].push(item);

  return acc;
  }, {});

  try {
    for (const vendedorId in subCarts) {
      const itemsDelVendedor = subCarts[vendedorId];

      await crearPedido(accessToken, itemsDelVendedor, campos);
    }
  } catch (error) {
    setErrorMensaje(error.message);
    setOpenError(true);
    return;
  } finally {
    setLoading(false);
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
        <SnackbarError
          mensaje={errorMensaje}
          open={openError}
          onClose={handleCloseError}
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
