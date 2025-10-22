import "./MisVentas.css"
import { Switch, FormGroup, FormControlLabel, CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";
import pedidosMock from "../../mockData/Orders.js"
import VentasBox from "./ventasBox/VentasBox.jsx";

export default function MisVentas() {

  const [pedidos, setPedidos] = useState([]);
    const [mostrarEnviables, setMostrarEnviables] = useState(false);
  
    const handleSwitch = (e) => {
      setMostrarEnviables(e.target.checked)
    }
  
    const pedidosFiltrados = mostrarEnviables ? pedidos.filter((p) =>
        !(p.estado.toLowerCase() === "entregado" || p.estado.toLowerCase() === "cancelado"))
    : pedidos;
  
      useEffect(() => {
        setPedidos(obtenerPedidos())
      }, [])

  return (
    <div className="my-sales">
      <div className="sales-header">
        <div className="sales-left">
          <h1>Ventas</h1>
          <p>Todas las ventas de tus productos</p>
        </div>
        <div className="sales-right">
          <h2>Pedidos Enviables</h2>
            <FormGroup>
              <FormControlLabel control={<Switch color="success" onChange={handleSwitch} sx={{ transform: "scale(1.2)" }}/>} 
              aria-label="Mostrar pedidos enviables"/>
            </FormGroup>
        </div>
      </div>
      <div className="sales-list">
        {!pedidosFiltrados.length ? 
          <div className="spinner">
            <CircularProgress color="success" />
          </div> :
          <div>
            {pedidosFiltrados.map((p) => (
              <VentasBox pedido={p} />
            ))}
          </div>
        }
      </div>
    </div>
  )
}

function obtenerPedidos() {
  return pedidosMock;
}