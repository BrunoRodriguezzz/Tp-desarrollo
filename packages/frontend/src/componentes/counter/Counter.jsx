import React from 'react'
import './Counter.css'

export default function Counter({cantidad, sumarUno, restarUno}) {
    return (
    <div className='counter-container'>
        <button className='counter-button'
            onClick={() => {
                restarUno()
            }}
        >
            -
        </button>
        <span>{cantidad}</span>
        <button className='counter-button'
            onClick={() => sumarUno()}
        >
            +
        </button>
    </div>
  )
}
