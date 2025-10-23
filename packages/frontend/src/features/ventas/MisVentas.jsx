import "./MisVentas.css"
import { Switch, FormGroup, FormControlLabel, CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";
import { HistorialUsuarioResponseMock } from "../../mockData/Pedidos.js"
import VentasList from "../../componentes/ventas/ventasList/VentasList.jsx";


//TODO - Hacerme mi propio mock
export default function MisVentas() {

  const [pedidos, setPedidos] = useState([]);
  const [mostrarEnviables, setMostrarEnviables] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  
  const handleSwitch = (e) => {
    setMostrarEnviables(e.target.checked)
  }
  
  const pedidosFiltrados = mostrarEnviables ? pedidos.filter((p) =>
      !(p.estado.toLowerCase() === "entregado" || p.estado.toLowerCase() === "cancelado"))
  : pedidos;
  
  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      const response = obtenerPedidos(currentPage);
      setPedidos(response.data);
      setTotalPages(response.totalPages);
      setLoading(false);
    }, 600);
    return () => clearTimeout(timeout);
  }, [currentPage]);

  return (
    <div className="my-sales">
      <div className="sales-header">
        <div className="sales-left">
          <h1>Mis Ventas</h1>
          <p>Revisá todas las ventas de tus productos y gestionalas</p>
        </div>
        <div className="sales-right">
          <h2>Pedidos Enviables</h2>
            <FormGroup>
              <FormControlLabel control={<Switch color="success" onChange={handleSwitch} sx={{ transform: "scale(1.2)" }}/>} 
              aria-label="Mostrar pedidos enviables"/>
            </FormGroup>
        </div>
      </div>
      <VentasList
        pedidos={pedidosFiltrados}
        loading={loading}
        currentPage={currentPage}
        pagination={{
          currentPage,
          totalPages,
          onPageChange: setCurrentPage,
        }}
      />
    </div>
  )
}

function obtenerPedidos(pagina) {
  const start = (pagina - 1) * HistorialUsuarioResponseMock.elementosPorPagina;
  const end = start + HistorialUsuarioResponseMock.elementosPorPagina;
  const pedidosPaginados = HistorialUsuarioResponseMock.data.slice(start, end);
  const total = HistorialUsuarioResponseMock.total;

  return {
    data: pedidosPaginados,
    total,
    totalPages: Math.ceil(
      total / HistorialUsuarioResponseMock.elementosPorPagina
    ),
  };
}