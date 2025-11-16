import React from "react";
import "./VentasBox.css";
import { Chip, Divider, Button } from "@mui/material";
import {
  LocalShipping,
  AccessTime,
  CheckCircle,
  Inventory2,
  Home,
  Cancel,
} from "@mui/icons-material";
import PedidosItemList from "../../pedidos/pedidosItemList/PedidosItemList";
import PedidosDetalleDialog from "../../pedidos/pedidosDetalleDialog/PedidosDetalleDialog";
import { useState } from "react";
import VentasEnviarDialog from "../ventasEnviarDialog/VentasEnviarDialog";
import { SnackbarSuccess } from "../../snackbars/SnackBarSuccess";
import propTypes from "prop-types";

export default function VentasBox({ pedido }) {
  const { id, estado, fechaCreacion, items, total } = pedido;
  const enviable = !(
    estado.toLowerCase() === "entregado" || estado.toLowerCase() === "cancelado" || estado.toLowerCase() === "enviado"
  );
  const [openDetalleDialog, setOpenDetalleDialog] = useState(false);
  const [openEnviarDialog, setOpenEnviarDialog] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [isEnviable, setIsEnviable] = useState(enviable);
  const [actualState, setActualState] = useState(estado);

  const marcarEnviado = () => {
    setOpenEnviarDialog(true);
  };

  const verDetalles = () => {
    setOpenDetalleDialog(true);
  };

  const handleSuccess = () => {
    setIsEnviable(false);
    setActualState("ENVIADO");
    setOpenSuccess(true);
  };

  const handleClose = () => {
    setOpenSuccess(false);
  };

  const status = getStatusConfig(actualState);

  const fecha = new Date(fechaCreacion);
  const fechaFormateada = fecha.toLocaleDateString("es", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <>
      <div className={`venta-box ${isEnviable ? "enviable" : "no-enviable"}`}>
        <div className="venta-header">
          <div className="venta-info">
            <h3>Pedido #{id}</h3>
            <p>Realizado el: {fechaFormateada}</p>
          </div>
          <Chip
            icon={status.icon}
            label={status.label}
            color={status.color}
            variant="outlined"
          />
        </div>
        <div className="venta-contenido">
          <PedidosItemList items={items} />
          <Divider className="venta-divider" />
          <div className="venta-total">
            <p className="total-label">Total de la venta</p>
            <p className="total-valor">
              {total.toLocaleString("es-AR", {
                style: "currency",
                currency: "ARS",
              })}
            </p>
          </div>
          <div className="venta-actions">
            <Button
              variant="outlined"
              className="btn-ver"
              onClick={verDetalles}
            >
              Ver Detalles
            </Button>
            {isEnviable && (
              <Button
                variant="contained"
                className="btn-enviar"
                onClick={marcarEnviado}
              >
                Marcar Enviado
              </Button>
            )}
          </div>
        </div>
      </div>
      <PedidosDetalleDialog
        pedido={pedido}
        open={openDetalleDialog}
        onOpenChange={setOpenDetalleDialog}
      />
      <VentasEnviarDialog
        pedido={pedido}
        open={openEnviarDialog}
        onOpenChange={setOpenEnviarDialog}
        onEnviado={handleSuccess}
      />
      <SnackbarSuccess
        mensaje="Se marco el pedido como enviado"
        open={openSuccess}
        onClose={handleClose}
      />
    </>
  );
}

function getStatusConfig(estado) {
  const statusConfig = {
    PENDIENTE: {
      label: "Pendiente",
      icon: <AccessTime fontSize="small" />,
      color: "warning",
    },
    CONFIRMADO: {
      label: "Confirmado",
      icon: <CheckCircle fontSize="small" />,
      color: "info",
    },
    EN_PREPARACION: {
      label: "En preparación",
      icon: <Inventory2 fontSize="small" />,
      color: "secondary",
    },
    ENVIADO: {
      label: "Enviado",
      icon: <LocalShipping fontSize="small" />,
      color: "primary",
    },
    ENTREGADO: {
      label: "Entregado",
      icon: <Home fontSize="small" />,
      color: "success",
    },
    CANCELADO: {
      label: "Cancelado",
      icon: <Cancel fontSize="small" />,
      color: "error",
    },
  };

  return statusConfig[estado];
}

VentasBox.propTypes = {
  pedido: propTypes.shape({
    id: propTypes.string.isRequired,
    estado: propTypes.string.isRequired,
    fechaCreacion: propTypes.string.isRequired,
    items: propTypes.arrayOf(
      propTypes.shape({
        producto: propTypes.string.isRequired,
        cantidad: propTypes.number.isRequired,
        precioUnitario: propTypes.number.isRequired,
        subTotal: propTypes.number.isRequired,
      })
    ).isRequired,
    total: propTypes.number.isRequired,
  }).isRequired,
};
