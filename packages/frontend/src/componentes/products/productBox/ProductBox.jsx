import React from "react";
import PropTypes from "prop-types";
import "./ProductBox.css";

export default function ProductBox({ producto }) {
  return (
    <div className="product-box">
      <img
        src={producto.fotos[0]}
        alt={producto.titulo}
        className="product-image"
      />
      <div className="product-content">
        <div className="product-text">
          <p className="product-category">{producto.categorias[0]}</p>
          <h2 className="product-name">{producto.titulo}</h2>
        </div>

        <div className="button-wrapper">
          <p className="product-price">${producto.precio}</p>
          <button className="add-to-cart-button">Agregar al Carrito</button>
        </div>
      </div>
    </div>
  );
}

// Ni idea, sin esto no funcionaba
ProductBox.propTypes = {
  producto: PropTypes.shape({
    fotos: PropTypes.array.isRequired,
    titulo: PropTypes.string.isRequired,
    precio: PropTypes.number.isRequired,
  }).isRequired,
};
