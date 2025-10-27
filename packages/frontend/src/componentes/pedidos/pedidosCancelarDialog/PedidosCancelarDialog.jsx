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

export default function PedidosCancelarDialog({ pedido, open, onOpenChange, onCancelado }) {
  const cancelarPedido = () => {
    //falta implementar
    console.log("Pedido cancelado:", pedido._id);
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
          Estás a punto de cancelar el pedido <b>#{pedido._id}</b>.
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
