import React, { useState } from "react";
import "./ProductList.css";
import ProductBox from "../productBox/ProductBox";
import productsMock from "../../../mockData/Products.js";
import Pagination from "../../pagination/Pagination.jsx";

const PRODUCTS_PER_PAGE = 12;

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

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(p) => setCurrentPage(p)}
      />
    </div>
  );
}
