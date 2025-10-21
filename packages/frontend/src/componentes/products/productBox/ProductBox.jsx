import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "./ProductBox.css";
import { useCart } from "../../carrito/cartContext/CartContext.jsx";

export default function ProductBox({ producto }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleClick = () => {
    navigate(`/productos/${producto._id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(producto);
  }

  return (
    <div
      className="product-box"
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
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
          <button className="add-to-cart-button" onClick={handleAddToCart}>Agregar al Carrito</button>
        </div>
      </div>
    </div>
  );
}

ProductBox.propTypes = {
  producto: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    fotos: PropTypes.array.isRequired,
    titulo: PropTypes.string.isRequired,
    precio: PropTypes.number.isRequired,
    categorias: PropTypes.array.isRequired,
  }).isRequired,
};
