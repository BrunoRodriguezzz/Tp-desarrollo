import React from "react";
import Counter from "../../../counter/Counter";
import "./CardProducto.css";
import { AiOutlineDelete } from "react-icons/ai";
import PropTypes from "prop-types";

export default function CardProducto({
  nombre,
  categorias,
  precio,
  cantidad,
  moneda,
  foto,
  sumarUno,
  restarUno,
  eliminarProducto,
}) {
  const getCurrencySymbol = (moneda) => {
    switch (moneda) {
      case "PESO_ARG":
        return "AR$";
      case "DOLAR_USA":
        return "US$";
      case "REAL":
        return "R$";
      case "EURO":
        return "€";
      default:
        return "";
    }
  };

  const symbol = getCurrencySymbol(moneda);

  return (
    <div className="producto">
      <div>
        <img src={foto} alt="" />
        <div>
          <h3>{nombre}</h3>
          <p>{categorias.join(", ")}</p>
          <span>{symbol + " " + precio.toFixed(2)}</span>
        </div>
      </div>
      <div className="producto-derecha">
        <Counter
          cantidad={cantidad}
          sumarUno={sumarUno}
          restarUno={restarUno}
        />
        <span>{symbol + " " + (precio * cantidad).toFixed(2)}</span>
        <AiOutlineDelete
          onClick={() => {
            eliminarProducto();
          }}
        />
      </div>
    </div>
  );
}

CardProducto.propTypes = {
  nombre: PropTypes.string.isRequired,
  categorias: PropTypes.array.isRequired,
  precio: PropTypes.number.isRequired,
  cantidad: PropTypes.number.isRequired,
  moneda: PropTypes.string.isRequired,
  foto: PropTypes.string.isRequired,
  sumarUno: PropTypes.func.isRequired,
  restarUno: PropTypes.func.isRequired,
  eliminarProducto: PropTypes.func.isRequired,
};
