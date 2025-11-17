import "./Pedidos.css";
import React, { useState, useEffect } from "react";
import PedidosList from "../../componentes/pedidos/pedidosList/PedidosList";

import Seo from "../../componentes/seo/Seo";
import { useSession } from "../auth/session/sessionContext";
import { getPedidos } from "../../services/pedidoService";

export default function Pedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const { accessToken } = useSession();

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
