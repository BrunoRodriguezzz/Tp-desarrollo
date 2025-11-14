import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export function SnackbarError({ mensaje, open, onClose }) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert
        onClose={onClose}
        severity="error"
        variant="filled"
        sx={{ width: "100%", padding: "8px 16px", borderRadius: "5px" }}
      >
        {mensaje}
      </Alert>
    </Snackbar>
  );
}
