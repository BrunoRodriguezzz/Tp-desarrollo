import React from "react";
import "./Notificaciones.css";
import {
  Switch,
  FormGroup,
  FormControlLabel,
  CircularProgress,
} from "@mui/material";
import { useState, useEffect } from "react";
import NotificacionBox from "./notificacionesBox/NotificacionBox";
import Seo from "../../componentes/seo/Seo";
import { obtenerNotificaciones } from "../../services/notificacionService";
import { useSession } from "../../features/auth/session/sessionContext";

export default function Notificaciones() {
  const [notificaciones, setNotificaciones] = useState([]);
  const [notificacionesCargadas, setNotificacionesCargadas] = useState(false);
  const [mostrarSinLeer, setMostrarSinLeer] = useState(false);
  const { getIdFromToken } = useSession();

  const userId = getIdFromToken();

  const handleSwitch = (e) => {
    setMostrarSinLeer(e.target.checked);
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await obtenerNotificaciones(
          userId,
          mostrarSinLeer ? false : undefined
        );
        setNotificaciones(data.notificaciones);
        setNotificacionesCargadas(true);
      } catch (error) {
        console.error("Error categorias obteniendo categorias:", error);
      }
    };
    fetch();
  }, [userId, mostrarSinLeer]);

  return (
    <>
      <div className="notification-container">
        <Seo
          title="Notificaciones | Tienda Sol"
          description="Revisá todas tus notificaciones y mantenete al día."
        />
        <div className="notification-header">
          <div className="notification-left">
            <h1>Notificaciones</h1>
            <p>Todas las notificaciones que recibiste</p>
          </div>
          <div className="notification-right">
            <h2>Notificaciones sin leer</h2>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    color="success"
                    onChange={handleSwitch}
                    sx={{ transform: "scale(1.2)" }}
                  />
                }
                aria-label="Mostrar notificaciones sin leer"
              />
            </FormGroup>
          </div>
        </div>
        <div className="notification-list">
          {!notificacionesCargadas ? (
            <div className="spinner">
              <CircularProgress color="success" />
            </div>
          ) : (
            <div>
              {!notificaciones.length ? (
                <p className="no-notifications-message">
                  No hay notificaciones para mostrar.
                </p>
              ) : (
                <div>
                  {notificaciones.map((n) => (
                    <NotificacionBox key={n._id} notificacion={n} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
