import React, { useEffect } from "react";
import PropTypes from "prop-types";
import PedidosBox from "../pedidosBox/PedidosBox";
import Pagination from "../../pagination/Pagination";
import PedidosBoxSkeleton from "../pedidosBoxSkeleton/PedidosBoxSkeleton";
import "./PedidosList.css";

export default function PedidosList({
  pedidos,
  loading,
  currentPage,
  pagination,
}) {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentPage]);

  return (
    <div className="pedido-list-container">
      <div className="pedido-list">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <PedidosBoxSkeleton key={i} />
          ))
        ) : pedidos.length === 0 ? (
          <p className="pedido-empty">No tenés pedidos aún.</p>
        ) : (
          pedidos.map((pedido) => (
            <PedidosBox key={`${pedido.id}-${currentPage}`} pedido={pedido} />
          ))
        )}
      </div>

      {!loading && pagination?.totalPages > 1 && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={pagination.onPageChange}
        />
      )}
    </div>
  );
}

PedidosList.propTypes = {
  pedidos: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  currentPage: PropTypes.number.isRequired,
  pagination: PropTypes.shape({
    currentPage: PropTypes.number,
    totalPages: PropTypes.number,
    onPageChange: PropTypes.func,
  }),
};
