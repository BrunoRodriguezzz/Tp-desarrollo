import React from "react";
import { useState } from "react";
import "./NotificacionBox.css";
import { FaCheck, FaInfoCircle } from "react-icons/fa";
import { SnackbarSuccess } from "../../../componentes/snackbars/SnackBarSuccess";
import { marcarNotificacionLeida } from "../../../services/notificacionService";
import PropTypes from "prop-types";

export default function NotificacionBox({ notificacion }) {
  const { _id, mensaje, fechaAlta, leida } = notificacion;
  const [openSuccess, setOpenSuccess] = useState(false);
  const [isLeida, setIsLeida] = useState(leida);

  const marcarLeida = async () => {
    try {
      await marcarNotificacionLeida(_id);
      setIsLeida(true);
      setOpenSuccess(true);
    } catch (error) {
      console.error("Error marcando notificación como leída:", error);
    }
  };

  const handleClose = () => {
    setOpenSuccess(false);
  };

  const fecha = new Date(fechaAlta);
  const fechaFormateada = fecha.toLocaleDateString("es", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={`notificacion-box ${isLeida ? "leida" : "no-leida"}`}>
      <div className="notificacion-contenido">
        <div>
          <FaInfoCircle size={22} />
        </div>
        <div className="notificacion-texto">
          <h1>{mensaje}</h1>
          <p>{fechaFormateada}</p>
        </div>
      </div>
      {!isLeida && (
        <div className="button-wrapper">
          <button className="leida-button" onClick={marcarLeida}>
            <FaCheck />
            Marcar como Leida
          </button>
        </div>
      )}
      <SnackbarSuccess
        mensaje={"Notificacion marcada como Leida"}
        open={openSuccess}
        onClose={handleClose}
      />
    </div>
  );
}

NotificacionBox.propTypes = {
  notificacion: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    mensaje: PropTypes.string.isRequired,
    fechaAlta: PropTypes.string.isRequired,
    leida: PropTypes.bool.isRequired,
  }).isRequired,
};
