import React, { useState } from "react";
import "./ProductList.css";
import ProductBox from "../../products/productBox/ProductBox";
import productsMock from "../../../mockData/Products.js";

const PRODUCTS_PER_PAGE = 9;

export default function ProductList() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(productsMock.length / PRODUCTS_PER_PAGE);

  const startIdx = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIdx = startIdx + PRODUCTS_PER_PAGE;
  const productsToShow = productsMock.slice(startIdx, endIdx);

  return (
    <div>
      <div className="product-list">
        {productsToShow.map((product) => (
          <ProductBox key={product._id} producto={product} />
        ))}
      </div>

      <div className="pagination">
        <button
          className="button-transparent-border-black"
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span>
          Página {currentPage} de {totalPages}
        </span>
        <button
          className="button-transparent-border-black"
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
