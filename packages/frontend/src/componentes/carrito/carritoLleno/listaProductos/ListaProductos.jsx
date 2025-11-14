import React from "react";
import CardProducto from "../cardProducto/CardProducto";
import "./ListaProductos.css";
import PropTypes from "prop-types";
import List from "@mui/material/List";

export default function ListaProductos({
  cartItems,
  addToCart,
  removeFromCart,
  decreaseQuantity,
}) {
  // const convertirMoneda = (moneda) => {
  //   switch (moneda) {
  //     case "PESO_ARG":
  //       return "ARS";
  //     case "DOLAR_USA":
  //       return "USD";
  //     case "EURO":
  //       return "EUR";
  //     case "REAL":
  //       return "BRL";
  //     default:
  //       return moneda;
  //   }
  // };

  return (
    <div className="lista-productos-container">
      {cartItems.map((item) => (
        <CardProducto
          key={item._id}
          nombre={item.titulo}
          categorias={item.categorias}
          precio={item.precio}
          cantidad={item.quantity}
          moneda={item.moneda}
          // moneda={convertirMoneda(item.moneda)}
          foto={item.fotos[0]}
          sumarUno={() => addToCart(item)}
          eliminarProducto={() => removeFromCart(item._id)}
          restarUno={() => decreaseQuantity(item._id)}
        />
      ))}
    </div>
  );
}

ListaProductos.propTypes = {
  cartItems: PropTypes.array.isRequired,
  addToCart: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  decreaseQuantity: PropTypes.func.isRequired,
};
