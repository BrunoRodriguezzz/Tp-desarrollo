import React from "react";
import "./PedidosDetalleDialog.css";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Divider,
  Box,
  Avatar,
  Stack,
  IconButton,
  Button,
} from "@mui/material";
import {
  LocalShipping,
  AccessTime,
  CheckCircle,
  Inventory2,
  Home,
  Cancel,
  Email,
  Phone,
  Close,
  LocationOn,
} from "@mui/icons-material";
import PedidosItemList from "../pedidosItemList/PedidosItemList";
import propTypes from "prop-types";

PedidosDetalleDialog.propTypes = {
  pedido: propTypes.object.isRequired,
  open: propTypes.bool.isRequired,
  onOpenChange: propTypes.func.isRequired,
};

export default function PedidosDetalleDialog({ pedido, open, onOpenChange }) {
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

  const status = statusConfig[pedido.estado];

  return (
    <Dialog
      open={open}
      onClose={() => onOpenChange(false)}
      maxWidth="md"
      fullWidth
      scroll="paper"
    >
      <Box className="pedido-header">
        <Box>
          <DialogTitle className="pedido-title">
            Pedido #{pedido.id}
          </DialogTitle>
          <p className="pedido-date">
            {new Date(pedido.fechaCreacion).toLocaleDateString("es-AR", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </Box>

        <Stack direction="row" alignItems="center" spacing={1}>
          <Chip
            icon={status.icon}
            label={status.label}
            color={status.color}
            variant="outlined"
          />
          <IconButton onClick={() => onOpenChange(false)}>
            <Close />
          </IconButton>
        </Stack>
      </Box>

      <Divider />

      <DialogContent dividers className="pedido-content">
        <Stack spacing={4}>
          <Box>
            <h3 className="pedido-section-title">Productos</h3>
            <PedidosItemList items={pedido.items} />
          </Box>

          <Divider className="pedido-divider" />

          {pedido.direccion && (
            <Box>
              <h3 className="pedido-section-title">Dirección de envío</h3>
              <Stack direction="row" alignItems="start" spacing={1}>
                <LocationOn fontSize="small" className="pedido-icon" />
                <Box>
                  <p className="pedido-producto-nombre">
                    {pedido.direccion.domicilio.calle}{" "}
                    {pedido.direccion.domicilio.altura}
                    {pedido.direccion.domicilio.piso &&
                      `, Piso ${pedido.direccion.domicilio.piso}`}
                    {pedido.direccion.domicilio.departamento &&
                      ` ${pedido.direccion.domicilio.departamento}`}
                  </p>
                  <p className="pedido-detalle">
                    {pedido.direccion.ciudad
                      ? // ciudad puede ser un objeto { nombre, provincia } o un string
                        (typeof pedido.direccion.ciudad === "object"
                          ? pedido.direccion.ciudad.nombre
                          : pedido.direccion.ciudad)
                      : ""}
                    {", "}
                    {pedido.direccion.provincia
                      ? // provincia puede ser un objeto o string
                        (typeof pedido.direccion.provincia === "object"
                          ? pedido.direccion.provincia.nombre
                          : pedido.direccion.provincia)
                      : ""}
                    {", "}
                    {pedido.direccion.pais}
                  </p>
                  <p className="pedido-detalle">
                    CP: {pedido.direccion.domicilio.codigoPostal}
                  </p>
                </Box>
              </Stack>
            </Box>
          )}

          {pedido.vendedor && (
            <>
              <Divider />
              <Box>
                <h3 className="pedido-section-title">
                  Información del vendedor
                </h3>
                <Stack spacing={1.2}>
                  <p className="pedido-producto-nombre">
                    {pedido.vendedor.nombre}
                  </p>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Email fontSize="small" />
                    <p className="pedido-detalle">{pedido.vendedor.email}</p>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Phone fontSize="small" />
                    <p className="pedido-detalle">{pedido.vendedor.telefono}</p>
                  </Stack>
                </Stack>
              </Box>
            </>
          )}

          {pedido.historialEstados && pedido.historialEstados.length > 0 && (
            <>
              <Divider />
              <Box>
                <h3 className="pedido-section-title">Historial del pedido</h3>
                <Stack spacing={2}>
                  {pedido.historialEstados.map((h, i) => (
                    <Box key={i} className="pedido-historial-item">
                      <Avatar
                        className={`pedido-historial-avatar ${h.estado.toLowerCase()}`}
                      >
                        {statusConfig[h.estado]?.icon}
                      </Avatar>
                      <Box>
                        <p className="pedido-producto-nombre">
                          {statusConfig[h.estado]?.label || h.estado}
                        </p>
                        <p className="pedido-detalle">
                          {new Date(h.fecha).toLocaleDateString("es-AR", {
                            day: "2-digit",
                            month: "short",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                        <p className="pedido-detalle">{h.motivo}</p>
                      </Box>
                    </Box>
                  ))}
                </Stack>
              </Box>
            </>
          )}
        </Stack>
      </DialogContent>

      <DialogActions className="pedido-footer">
        <p>Total del pedido:</p>
        <p className="pedido-total">
          {pedido.total.toLocaleString("es-AR", {
            style: "currency",
            currency: "ARS",
          })}
        </p>
      </DialogActions>
    </Dialog>
  );
}
