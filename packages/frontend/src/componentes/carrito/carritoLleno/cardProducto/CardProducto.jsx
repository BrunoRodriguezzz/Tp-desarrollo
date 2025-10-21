import React from 'react'
import Counter from '../../../counter/Counter'
import "./CardProducto.css";
import { AiOutlineDelete } from "react-icons/ai";


export default function CardProducto({nombre, categorias, precio, cantidad, moneda, foto, onDelete, modificarCantidad}) {
    const convertirMoneda = (moneda) => {
        switch(moneda) {
            case "PESO_ARG":
                return "ARS"
            case "DOLAR":
                return "USD"
            case "EURO":
                return "EUR"
            default:
                return moneda
        }
    }

    const setCantidad = (nuevaCantidad) => {
        modificarCantidad(nombre, nuevaCantidad);
    }

    console.log("foto", foto)
    return (
    <div className="producto">
        <div>
            <img src={foto} alt="" />
            <div>
                <h3>{nombre}</h3>
                <p>{categorias.join(", ")}</p>
                <span>${precio.toFixed(2) + " " + convertirMoneda(moneda)}</span>
            </div>
        </div>
        <div>
            <Counter cantidad={cantidad} setCantidad={setCantidad} onDelete={() => onDelete(nombre)} />
            <span>${(precio * cantidad).toFixed(2) + " " + convertirMoneda(moneda)}</span>
            <AiOutlineDelete />

        </div>
    </div>
  )
}
