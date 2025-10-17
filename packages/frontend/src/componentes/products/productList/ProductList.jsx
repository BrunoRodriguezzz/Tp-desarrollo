import React, { useState } from "react";
import PropTypes from "prop-types";
import "./ProductList.css";
import ProductBox from "../../products/productBox/ProductBox";
import productsMock from "../../../mockData/Products.js";
import Pagination from "../../pagination/Pagination.jsx";

const PRODUCTS_PER_PAGE = 12;

export default function ProductList({ columns = 4 }) {
  const [currentPage, setCurrentPage] = useState(1);
  const cols = Number(columns) || 1;
  const totalPages = Math.ceil(productsMock.length / PRODUCTS_PER_PAGE);

  const startIdx = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIdx = startIdx + PRODUCTS_PER_PAGE;
  const productsToShow = productsMock.slice(startIdx, endIdx);

  return (
    <div>
      <div
        className="product-list"
        style={{
          gridTemplateColumns: `repeat(${cols}, minmax(300px, 1fr))`,
        }}
      >
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

ProductList.propTypes = {
  columns: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
