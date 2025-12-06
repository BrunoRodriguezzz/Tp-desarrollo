import React from "react";
import "./MisVentas.css";
import { Switch, FormGroup, FormControlLabel } from "@mui/material";
import { useState, useEffect } from "react";
import VentasList from "../../componentes/ventas/ventasList/VentasList.jsx";
import Seo from "../../componentes/seo/Seo";
import { useSession } from "../../features/auth/session/sessionContext";
import { getPedidos } from "../../services/pedidoService";

export default function MisVentas() {
  const [pedidos, setPedidos] = useState([]);
  const [mostrarEnviables, setMostrarEnviables] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const { accessToken } = useSession();

  const handleSwitch = (e) => {
    setMostrarEnviables(e.target.checked);
  };

  const pedidosFiltrados = mostrarEnviables
    ? pedidos.filter(
        (p) =>
          !(
            p.estado.toLowerCase() === "entregado" ||
            p.estado.toLowerCase() === "cancelado"
          )
      )
    : pedidos;

  useEffect(() => {
    setLoading(true);
    const fetch = async () => {
      try {
        const response = await getPedidos(accessToken, currentPage, 10);
        setPedidos(response.data);
        setTotalPages(response.totalPages);
        setLoading(false);
      } catch (error) {
        console.error("Error obteniendo pedidos:", error);
      }
    };
    fetch();
  }, [currentPage, accessToken]);

  return (
    <div className="mis-ventas">
      <Seo
        title="Mis ventas | Tienda Sol"
        description="Consultá y gestioná las ventas de tus productos."
      />
      <div className="ventas-header">
        <div className="ventas-left">
          <h1>Mis Ventas</h1>
          <p>Revisá todas las ventas de tus productos y gestionalas</p>
        </div>
        <div className="ventas-right">
          <h2>Pedidos Enviables</h2>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  color="success"
                  onChange={handleSwitch}
                  sx={{ transform: "scale(1.2)" }}
                />
              }
              aria-label="Mostrar pedidos enviables"
            />
          </FormGroup>
        </div>
      </div>
      <VentasList
        className="ventas-list"
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
  );
}


