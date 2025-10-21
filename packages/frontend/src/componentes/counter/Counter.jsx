import React from 'react'
import './Counter.css'

export default function Counter({cantidad, setCantidad, onDelete}) {
  
    return (
    <div className='counter-container'>
        <button className='counter-button'
            onClick={() => {
                if(cantidad > 0) {
                    setCantidad(cantidad - 1)
                }
                else{
                    onDelete()
                }
            }}
        >
            -
        </button>
        <span>{cantidad}</span>
        <button className='counter-button'
            onClick={() => setCantidad(cantidad + 1)}
        >
            +
        </button>
    </div>
  )
}
