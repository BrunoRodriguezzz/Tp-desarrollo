import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import "./VentasEnviarDialog.css";

export default function VentasEnviarDialog({ pedido, open, onOpenChange }) {
  const enviarPedido = () => {
    console.log("Pedido enviado:", pedido._id);
    onOpenChange(false);
  };

  return (
    <Dialog
      open={open}
      onClose={() => onOpenChange(false)}
      maxWidth="sm"
      fullWidth
      className="enviar-dialog"
    >
      <DialogTitle className="title">¿Marcar como enviado este pedido?</DialogTitle>

      <DialogContent dividers sx={{ pb: 2 }}>
        <p className="subtitle">
          Estás a punto de marcar como enviado al pedido <b>#{pedido._id}</b>.
        </p>
      </DialogContent>

      <DialogActions className="btns-container">
        <Button
          variant="outlined"
          className="btn-ver"
          onClick={() => onOpenChange(false)}
        >
          No, no marcar
        </Button>
        <Button
          variant="contained"
          className="btn-enviar"
          onClick={() => enviarPedido()}
        >
          Marcar Pedido Como Enviado
        </Button>
      </DialogActions>
    </Dialog>
  );
}