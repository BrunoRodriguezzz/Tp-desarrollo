import React, { useEffect, useState } from "react";
import "../productList/ProductList.css";
import Pagination from "../../pagination/Pagination.jsx";
import PropTypes from "prop-types";
import {buscarMisProductos} from "../../../services/productoService.js";
import Box from "@mui/material/Box";
import ProductBoxSkeleton from "../productBoxSkeleton/ProductBoxSkeleton.jsx";
import MisProductosBox from "./misProductosBox/MisProductosBox.jsx";
import { useSession } from "../../../features/auth/session/sessionContext.jsx";

export default function MisProductosList({ filtros = {}, paginado = { page: 1, size: 10 }, setPaginado, pagination = true }) {
  const { accessToken } = useSession();
  const [productosPagina, setProductosPagina] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, [paginado]);

  useEffect(() => {
    const fetch = async () => {
      try {
        setCargando(true);
        const { totalPages, productosPagina } = await buscarMisProductos(paginado.size, paginado.page, accessToken);
        setTotalPages(totalPages);
        setProductosPagina(productosPagina);
      } catch (error) {
        console.error("Error buscando productos:", error);
      } finally {
        setCargando(false);
      }
    };
    fetch();
  }, [paginado]);

  const handlePageChange = (newPage) => {
    setPaginado("page", newPage);
  };

  if (cargando) {
    return (
      <div className="product-list">
        {Array.from({ length: 12 }, (_, i) => (
          <ProductBoxSkeleton key={i} />
        ))}
      </div>
    );
  } else {
    return (
      <div>
        <div className="product-list">
          {(productosPagina != undefined && productosPagina.length > 0) ? productosPagina.map((product) => (
            <MisProductosBox key={product._id} producto={product} />
          )) : (
            <div className="noProducts-container">
              <Box 
                component={"img"}
                src="/images/noProducts.png"
                alt="no products"
                sx={{ maxWidth: "100%", height: "auto"}}
              />
              <span>No se encontraron productos.</span>
            </div>
          )}
        </div>

        {pagination && totalPages > 1 && (
          <Pagination
            currentPage={paginado.page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    );
  }
}

MisProductosList.propTypes = {
  filtros: PropTypes.object,
  paginado: PropTypes.shape({
    page: PropTypes.number,
    size: PropTypes.number
  }),
  setPaginado: PropTypes.func,
  pagination: PropTypes.bool
};