import React from "react";
import PropTypes from "prop-types";
import "./CategoryBox.css";

export default function CategoryBox({ category }) {
  return (
    <div className="category-box">
      <span>{category.name}</span>
      <p>{category.products} productos</p>
    </div>
  );
}

CategoryBox.propTypes = {
  category: PropTypes.shape({
    name: PropTypes.string.isRequired,
    products: PropTypes.number.isRequired,
  }).isRequired,
};
