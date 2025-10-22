import "./Pedidos.css";
import PedidosBox from "../../componentes/pedidos/pedidosBox/PedidosBox";
import { HistorialUsuarioResponseMock } from "../../mockData/Pedidos";
import React, { useState, useEffect } from "react";
import Pagination from "../../componentes/pagination/Pagination";

export default function Pedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const response = obtenerPedidos(currentPage);
    setPedidos(response.data);
    setTotalPages(response.totalPages);
  }, [currentPage]);

  return (
    <>
      <div className="pedido-container">
        <div className="pedido-main-header">
          <h1>Mis pedidos</h1>
          <p>Revisá todos los pedidos que realizaste y gestionalos</p>
        </div>
        <div className="pedido-list">
          {pedidos.length === 0 ? (
            <p className="pedido-empty">No tenés pedidos aún.</p>
          ) : (
            pedidos.map((pedido) => (
              <PedidosBox key={pedido._id} pedido={pedido} />
            ))
          )}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </>
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
