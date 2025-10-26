import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "./ProductBox.css";
import { useCart } from "../../carrito/cartContext/CartContext.jsx";
import { SnackbarSuccess } from "../../snackbars/SnackBarSuccess.jsx"
import Skeleton from "@mui/material/Skeleton";

export default function ProductBox({ producto }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [openSuccess, setOpenSuccess] = useState(false);

  const handleClick = () => {
    navigate(`/productos/${producto._id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(producto);
    setOpenSuccess(true);
  }

  const handleClose = () => {
    setOpenSuccess(false);
  }

  return (
    <div
      className="product-box"
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      <div className="product-image-wrapper" style={{ position: "relative" }}>
        {!imgLoaded && (
          <Skeleton
            variant="rectangular"
            className="product-image"
            sx={{ minHeight: "14rem" }}
          />
        )}
        <img
          src={producto.fotos[0]}
          alt={producto.titulo}
          className="product-image"
          onLoad={() => setImgLoaded(true)}
          onError={() => setImgLoaded(true)}
          style={{ display: imgLoaded ? "block" : "none" }}
        />
      </div>
      <div className="product-content">
        <div className="product-text">
          <p className="product-category">{producto.categorias[0]}</p>
          <h2 className="product-name">{producto.titulo}</h2>
        </div>

        <div className="button-wrapper">
          <p className="product-price">${producto.precio}</p>
          <button className="add-to-cart-button" onClick={handleAddToCart}>
            Agregar al Carrito
          </button>
        </div>
      </div>

      <SnackbarSuccess
        mensaje="Se agrego el producto al carrito"
        open={openSuccess}
        onClose={handleClose}
      />
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
