import React, { useState } from "react";
import { Card, CardContent, Chip, Box, Divider, Button } from "@mui/material";
import {
  LocalShipping,
  AccessTime,
  CheckCircle,
  Inventory2,
  Home,
  Cancel,
} from "@mui/icons-material";
import "./PedidosBox.css";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import PedidosDetalleDialog from "../pedidosDetalleDialog/PedidosDetalleDialog";
import PedidosCancelarDialog from "../pedidosCancelarDialog/PedidosCancelarDialog";
import PedidoItemList from "../pedidosItemList/PedidosItemList";
import { SnackbarSuccess } from "../../snackbars/SnackBarSuccess";

export default function PedidosBox({ pedido }) {
  const [openDetalleDialog, setOpenDetalleDialog] = useState(false);
  const [openCancelarDialog, setOpenCancelarDialog] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);

  const { id, estado, fechaCreacion, items, total } = pedido;

  const mostrarBotonCancelar =
    estado !== "ENVIADO" && estado !== "ENTREGADO" && estado !== "CANCELADO";

  const handleSuccess = () => {
    setOpenSuccess(true);
  }

  const handleClose = () => {
    setOpenSuccess(false);
  }

  const fechaFormateada = format(
    new Date(fechaCreacion),
    "d 'de' MMMM 'de' yyyy",
    { locale: es }
  );

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

  const status = statusConfig[estado];

  return (
    <>
      <Card className="pedido-card" elevation={0}>
        <Box className="pedido-card-header">
          <Box>
            <h3 className="pedido-numero">Pedido #{id}</h3>
            <p className="pedido-fecha">Realizado el {fechaFormateada}</p>
          </Box>

          <Chip
            icon={status.icon}
            label={status.label}
            color={status.color}
            variant="outlined"
          />
        </Box>

        <CardContent className="pedido-contenido">
          <PedidoItemList items={items} />

          <Divider className="pedido-divider" />

          <Box className="pedido-total">
            <p className="total-label">Total del pedido</p>
            <p className="total-valor">
              {total.toLocaleString("es-AR", {
                style: "currency",
                currency: "ARS",
              })}
            </p>
          </Box>

          <Box className="pedido-actions">
            <Button
              variant="outlined"
              className="btn-ver"
              onClick={() => setOpenDetalleDialog(true)}
            >
              Ver Detalles
            </Button>
            {mostrarBotonCancelar && (
              <Button
                variant="contained"
                className="btn-cancelar"
                onClick={() => setOpenCancelarDialog(true)}
              >
                Cancelar Pedido
              </Button>
            )}
          </Box>
        </CardContent>
      </Card>
      <PedidosDetalleDialog
        pedido={pedido}
        open={openDetalleDialog}
        onOpenChange={setOpenDetalleDialog}
      />
      <PedidosCancelarDialog
        pedido={pedido}
        open={openCancelarDialog}
        onOpenChange={setOpenCancelarDialog}
        onCancelado={handleSuccess}
      />
      <SnackbarSuccess
        mensaje="Se cancelo el pedido"
        open={openSuccess}
        onClose={handleClose}
      />
    </>
  );
}
