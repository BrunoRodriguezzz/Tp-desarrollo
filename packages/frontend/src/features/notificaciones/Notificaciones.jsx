import "./Notificaciones.css";
import { Switch, FormGroup, FormControlLabel, CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";
import notificationsMock from "../../mockData/Notifications";
import NotificacionBox from "./notificacionesBox/NotificacionBox";

export default function Notificaciones() {
  const [notificaciones, setNotificaciones] = useState([]);
  const [mostrarSinLeer, setMostrarSinLeer] = useState(false);

  const handleSwitch = (e) => {
    setMostrarSinLeer(e.target.checked)
  }

  const notificacionesFiltradas = mostrarSinLeer
    ? notificaciones.filter((n) => !n.leida)
    : notificaciones;

    useEffect(() => {
      setNotificaciones(obtenerNotificaciones())
    }, [])

  return (
  <>
  <div className="notification-container">
    <div className="notification-header">
      <div className="notification-left">
        <h1>Notificaciones</h1>
        <p>Todas las notificaciones que recibiste</p>
      </div>
      <div className="notification-right">
        <h2>Notificaciones sin leer</h2>
        <FormGroup>
          <FormControlLabel control={<Switch color="success" onChange={handleSwitch} sx={{ transform: "scale(1.2)" }}/>} 
          aria-label="Mostrar notificaciones sin leer"/>
        </FormGroup>
      </div>
    </div>
    <div className="notification-list">
      {!notificacionesFiltradas.length ? 
        <div className="spinner">
            <CircularProgress color="success" />
        </div> :
        <div>
          {notificacionesFiltradas.map((n) => (
          <NotificacionBox notificacion={n} />
        ))}
        </div>
      }
    </div>
  </div>
  </>
  )
}

function obtenerNotificaciones() {
  //TODO - Hago la funcion porque despues vamos a hacer el fetch
  return notificationsMock;
}