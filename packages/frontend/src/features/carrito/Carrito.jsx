import { useEffect, useState } from "react";
import { useCart } from "../../componentes/carrito/cartContext/CartContext";
import CarritoLleno from "../../componentes/carrito/carritoLleno/CarritoLleno"
import CarritoVacio from "../../componentes/carrito/CarritoVacio/CarritoVacio"
import Counter from "../../componentes/counter/Counter"
import CardProducto from "../../componentes/carrito/carritoLleno/cardProducto/CardProducto";

export default function Carrito() {
    const { totalItems} = useCart();    
    return (
        totalItems == 0 
            ? <CarritoVacio />
            : <CarritoLleno />
    )
}
