import "./Pedidos.css";
import PedidosBox from "../../componentes/pedidos/pedidosBox/PedidosBox";
import { HistorialUsuarioResponseMock } from "../../mockData/Pedidos";
import React, { useState, useEffect } from "react";

export default function Pedidos() {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const response = obtenerPedidos();
    setPedidos(response.data);
  }, []);

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
      </div>
    </>
  );
}

function obtenerPedidos() {
  return HistorialUsuarioResponseMock;
}
