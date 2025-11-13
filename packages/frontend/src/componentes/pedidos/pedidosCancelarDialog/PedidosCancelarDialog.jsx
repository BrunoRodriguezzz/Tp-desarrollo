import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Divider,
} from "@mui/material";
import "./PedidosCancelarDialog.css";
import { cancelacionPedido } from "../../../services/pedidoService.js";
import { useSession } from "../../../features/auth/session/sessionContext.jsx";

export default function PedidosCancelarDialog({ pedido, open, onOpenChange, onCancelado }) {
  const { accessToken } = useSession();

  const cancelarPedido = async () => {
    try {
      await cancelacionPedido(accessToken, pedido.id, "El comprador cancelo el pedido")
    } catch(error) {
      console.error("Error cancelando el pedido:", error);
    }
    console.log("Pedido cancelado:", pedido.id);
    onCancelado();
    onOpenChange(false);
  };

  return (
    <Dialog
      open={open}
      onClose={() => onOpenChange(false)}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle className="title">¿Cancelar este pedido?</DialogTitle>

      <DialogContent dividers sx={{ pb: 2 }}>
        <p className="subtitle">
          Estás a punto de cancelar el pedido <b>#{pedido.id}</b>.
        </p>
      </DialogContent>

      <Divider />

      <DialogActions className="btns-container">
        <Button
          variant="outlined"
          className="btn-ver"
          onClick={() => onOpenChange(false)}
        >
          No, mantener pedido
        </Button>
        <Button
          variant="contained"
          className="btn-cancelar"
          onClick={() => cancelarPedido()}
        >
          Cancelar Pedido
        </Button>
      </DialogActions>
    </Dialog>
  );
}
