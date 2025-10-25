import React, { useEffect, useState } from "react";
import "./ProductList.css";
import ProductBox from "../productBox/ProductBox";
import Pagination from "../../pagination/Pagination.jsx";
import PropTypes from "prop-types";
import {buscarProductosMock, buscarProductos} from "../../../services/productoService.js";
import Box from "@mui/material/Box";
import ProductBoxSkeleton from "../productBoxSkeleton/ProductBoxSkeleton.jsx";

export default function ProductList({ filtros = {}, paginado = { page: 1, size: 10 }, setPaginado, pagination = true }) {

  const [productosPagina, setProductosPagina] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        setCargando(true);
        const { totalPages, productosPagina } = await buscarProductos(paginado.size, paginado.page, filtros);
        setTotalPages(totalPages);
        setProductosPagina(productosPagina);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setCargando(false);
      }
    };
    fetch();
  }, [paginado, filtros]);

  const handlePageChange = (newPage) => {
    setPaginado("page", newPage);
  };

  if (cargando) {
    return (
      <div className="product-list">
        {Array.from({ length: 12 }, (_, i) => (
          <ProductBoxSkelenton key={i} />
        ))}
      </div>
    );
  } else {
    return (
      <div>
        <div className="product-list">
          {(productosPagina != undefined && productosPagina.length > 0) ? productosPagina.map((product) => (
            <ProductBox key={product._id} producto={product} />
          )) : (
            <div className="noProducts-container">
              <Box 
                component={"img"}
                src="/images/noProducts.png"
                alt="no products"
                sx={{ maxWidth: "100%", height: "auto"}}
              />
              <span>No se encontraron productos que coincidan con los filtros aplicados.</span>
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

ProductList.propTypes = {
  filtros: PropTypes.object,
  paginado: PropTypes.shape({
    page: PropTypes.number,
    size: PropTypes.number
  }),
  setPaginado: PropTypes.func,
  pagination: PropTypes.bool
};