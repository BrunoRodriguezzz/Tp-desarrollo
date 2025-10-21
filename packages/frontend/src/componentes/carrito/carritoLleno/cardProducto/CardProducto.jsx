import React from 'react'
import Counter from '../../../counter/Counter'

export default function CardProducto({nombre, categorias, precio, cantidad, moneda, imagen, onDelete}) {
  
    return (
    <div>
        {/* <div>
            <img src={imagen} alt="" />
            <h3>{nombre}</h3>
            <p>{categorias.join(", ")}</p>
            <span>${precio.toFixed(2) + " " +  moneda}</span>
        </div>
        <div>
            <Counter cantidad={cantidad} setCantidad={() => {}} onDelete={onDelete} />
        </div> */}
    </div>
  )
}
