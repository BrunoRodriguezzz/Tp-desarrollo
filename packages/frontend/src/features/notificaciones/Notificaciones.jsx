import "./Notificaciones.css"
import { Switch, FormGroup, FormControlLabel } from '@mui/material';
import { useState } from 'react';

export default function Notificaciones() {

  const handleSwitch = () => {

  }
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

    </div>
  </div>
  </>
  )
}