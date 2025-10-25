import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './DetallePedido.css'

export default function DetallePedido({cartItems, isCheckout}) {
    const [total, setTotal] = useState(0);

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
    
    const sumarIVA = (monto) => {
        return monto * 1.21; 
    }

    useEffect(() => {
        let sumaTotal = 0;
        cartItems.forEach(item => {
            sumaTotal += item.precio * item.quantity;
        });
        setTotal(sumaTotal);
    }, [cartItems]);

    return (
    <div className="resumen-pedido">
        <h3>Resumen del pedido</h3>
        <div>
            <p>Subtotal</p>
            <p>${total.toFixed(2) + " ARS"}</p> 
        </div>
        <div>
            <p>Envío</p>
            <p>Gratis</p>
        </div>
        <div>
            <p>Impuestos</p>
            <p>21%</p>
        </div>
        <div style={{ borderTop: '1px solid #eee'}}>
            <p style={{ color: 'black', fontWeight: 'bold', fontSize: '1.2rem'  }}>Total</p>
            <p style={{ color: 'black', fontWeight: 'bold', fontSize: '1.2rem'  }}>${sumarIVA(total).toFixed(2) + " ARS" }</p>
        </div>

        <div className={`resumen-botones ${isCheckout ? "single-btn" : ""}`}>
            <Link to="/checkout" className="btn-comprar">
                {isCheckout ?
                    "Comprar":
                    "Continuar compra"
                }
            </Link>
            {isCheckout ? null :
             <Link to="/productos" className="btn-continuar">
                Continuar comprando
             </Link>
            }
        </div>
    </div>
  )
}
