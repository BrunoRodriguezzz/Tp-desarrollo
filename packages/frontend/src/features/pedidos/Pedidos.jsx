import "./Pedidos.css";
import React, { useState, useEffect } from "react";
import PedidosList from "../../componentes/pedidos/pedidosList/PedidosList";
import { HistorialUsuarioResponseMock } from "../../mockData/Pedidos";
import Seo from "../../componentes/seo/Seo";

export default function Pedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

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
    <div className="pedido-container">
      <Seo
        title="Mis pedidos | Tienda Sol"
        description="Revisá y gestioná el estado de todos tus pedidos."
      />
      <div className="pedido-main-header">
        <h1>Mis pedidos</h1>
        <p>Revisá todos los pedidos que realizaste y gestionalos</p>
      </div>

      <PedidosList
        pedidos={pedidos}
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
