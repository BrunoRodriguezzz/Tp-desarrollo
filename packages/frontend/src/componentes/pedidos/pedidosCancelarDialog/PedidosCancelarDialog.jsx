import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Divider,
  CircularProgress,
} from "@mui/material";
import "./PedidosCancelarDialog.css";
import { cancelacionPedido } from "../../../services/pedidoService.js";
import { useSession } from "../../../features/auth/session/sessionContext.jsx";

export default function PedidosCancelarDialog({ pedido, open, onOpenChange, onCancelado }) {
  const { accessToken } = useSession();
  const [loading, setLoading] = useState(false);

  const cancelarPedido = async () => {
    try {
      setLoading(true);
      await cancelacionPedido(accessToken, pedido.id, "El comprador cancelo el pedido")
      console.log("Pedido cancelado:", pedido.id);
    } catch(error) {
      console.error("Error cancelando el pedido:", error);
    } finally {
      setLoading(false);
    }
    
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
      {loading && (
        <div className="loading-overlay">
          <CircularProgress size={60} thickness={4} />
        </div>
      )}
    </Dialog>
  );
}
