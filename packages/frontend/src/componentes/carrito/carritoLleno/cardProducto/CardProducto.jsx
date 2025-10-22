import React from 'react'
import Counter from '../../../counter/Counter'
import "./CardProducto.css";
import { AiOutlineDelete } from "react-icons/ai";


export default function CardProducto({nombre, categorias, precio, cantidad, moneda, foto, sumarUno, restarUno, eliminarProducto}) {
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
        <div className='producto-derecha'>
            <Counter cantidad={cantidad} sumarUno={sumarUno} restarUno={restarUno}/>
            <span>${(precio * cantidad).toFixed(2) + " " + convertirMoneda(moneda)}</span>
            <AiOutlineDelete 
                onClick={() => {eliminarProducto()}}
            />
        </div>
    </div>
  )
}
