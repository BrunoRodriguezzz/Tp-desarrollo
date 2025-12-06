import React from "react";
import PropTypes from "prop-types";
import "./CategoryBox.css";
import { Link } from "react-router-dom";
export default function CategoryBox({ category }) {
  return (
    <Link
      to={{
        pathname: "/productos",
        search: `?categoria=${encodeURIComponent(category.nombre)}`,
      }}
      className="category-box"
    >
      <span>{category.nombre}</span>
      <p>{category.cantidad} productos</p>
    </Link>
  );
}

CategoryBox.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.string.isRequired,
    image: PropTypes.node.isRequired,
    name: PropTypes.string.isRequired,
    products: PropTypes.number.isRequired,
  }).isRequired,
};
