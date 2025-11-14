import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import PropTypes from "prop-types";

export function SnackbarSuccess({ mensaje, open, onClose }) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert
        onClose={onClose}
        severity="success"
        variant="filled"
        sx={{ width: "100%", padding: "8px 16px", borderRadius: "5px" }}
      >
        {mensaje}
      </Alert>
    </Snackbar>
  );
}

SnackbarSuccess.propTypes = {
  mensaje: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
