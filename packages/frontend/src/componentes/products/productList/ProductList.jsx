import React, { useState, useEffect } from "react";
import "./ProductList.css";
import ProductBox from "../productBox/ProductBox";
import Pagination from "../../pagination/Pagination.jsx";
import PropTypes from "prop-types";
import productsMock from "../../../mockData/Products.js";

export default function ProductList({ limit = 12, initialPage = 1, pagination = true, filtros = {} }) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const { totalPages, productosPagina } = buscarProductosMock(limit, currentPage, filtros);


  useEffect(() => {
    setCurrentPage(1);
  }, [filtros]);

  return (
    <div>
      <div className="product-list">
        {productosPagina.map((product) => (
          <ProductBox key={product._id} producto={product} />
        ))}
      </div>

      {pagination && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}

ProductList.propTypes = {
  limit: PropTypes.number,
  pagination: PropTypes.bool,
  initialPage: PropTypes.number,
  filtros: PropTypes.object
};

function buscarProductosMock(limit, currentPage, filtros = {}) {
  const {
    soloNuevos,
    categoriaSeleccionada,
    minPrecio,
    maxPrecio,
    ordenamiento
  } = filtros;

  let prodFiltrado = productsMock;

  if (soloNuevos) {
    // TODO: Implementar
  }

  if (categoriaSeleccionada) {
    prodFiltrado = prodFiltrado.filter(product => 
      product.categorias.includes(categoriaSeleccionada)
    );
  }

  if (typeof minPrecio === 'number' && minPrecio >= 0) {
    prodFiltrado = prodFiltrado.filter(product => 
      product.precio >= minPrecio
    );
  }

  if (typeof maxPrecio === 'number' && maxPrecio >= 0) {
    prodFiltrado = prodFiltrado.filter(product => 
      product.precio <= maxPrecio
    );
  }

  // Eliminar productos duplicados (por _id) --> No se porq se me generan duplicados
  const uniqueProducts = [];
  const seenIds = new Set();
  
  prodFiltrado.forEach(product => {
    if (!seenIds.has(product._id)) {
      seenIds.add(product._id);
      uniqueProducts.push(product);
    }
  });
  
  prodFiltrado = uniqueProducts;

  if (ordenamiento) {
    const productosOrdenar = [...prodFiltrado];
    
    switch(ordenamiento) {
      case "masVendidos":
        productosOrdenar.sort((a, b) => {
          if (b.ventas !== a.ventas) {
            return b.ventas - a.ventas;
          }
          return a._id.localeCompare(b._id);
        });
        break;
        
      case "precioBajoAlto":
        productosOrdenar.sort((a, b) => {
          if (a.precio !== b.precio) {
            return a.precio - b.precio;
          }
          return a._id.localeCompare(b._id);
        });
        break;
        
      case "precioAltoAbajo":
        productosOrdenar.sort((a, b) => {
          if (b.precio !== a.precio) {
            return b.precio - a.precio;
          }
          return a._id.localeCompare(b._id);
        });
        break;
    }
    
    prodFiltrado = productosOrdenar;
  }

  // 5. Paginación
  const inicio = (currentPage - 1) * limit;
  const fin = inicio + limit;
  const productosPagina = prodFiltrado.slice(inicio, fin);
  const totalPages = Math.ceil(prodFiltrado.length / limit);

  return { totalPages, productosPagina };
}