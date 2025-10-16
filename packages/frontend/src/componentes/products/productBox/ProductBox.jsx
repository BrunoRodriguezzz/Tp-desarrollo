import React from "react";
import "./ProductBox.css";

export default function ProductBox(producto) {
  return (
    <div className="product-box">
      <img src={producto.image} alt={producto.name} className="product-image" />
      <h2 className="product-name">{producto.name}</h2>
      <p className="product-price">${producto.price}</p>
      <button className="add-to-cart-button">Agregar al Carrito</button>
    </div>
  );
}
