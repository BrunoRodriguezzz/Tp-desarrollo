import Pagination from "../../pagination/Pagination"
import PedidosBoxSkeleton from "../../pedidos/pedidosBoxSkeleton/PedidosBoxSkeleton"
import VentasBox from "../ventasBox/VentasBox"
import "./VentasList.css"

export default function VentasList({
  pedidos,
  loading,
  currentPage,
  pagination,
}) {
  return (
    <div className="sales-list-container">
          <div className="ventas-list">
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <PedidosBoxSkeleton key={i} />
              ))
            ) : pedidos.length === 0 ? (
              <p className="sales-empty">No tenés ventas aún.</p>
            ) : (
              pedidos.map((pedido) => (
                <VentasBox key={`${pedido._id}-${currentPage}`} pedido={pedido} />
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
  )
}