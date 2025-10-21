import { useState } from "react";
import CarritoLleno from "../../componentes/carrito/carritoLleno/CarritoLleno"
import CarritoVacio from "../../componentes/carrito/CarritoVacio/CarritoVacio"
import Counter from "../../componentes/counter/Counter"
import CardProducto from "../../componentes/carrito/carritoLleno/cardProducto/CardProducto";

export default function Carrito() {
    const [productos, setProductos] = useState([
  {
    nombre: "Zapatillas Nike Air 2",
    categorias: ["Deportes", "Tecnología"],
    precio: 10772.94,
    cantidad: 29,
    moneda: "ARS",
    imagen: "/home/fede/Escritorio/facultad/2025-2c-2c-lu-sa-grupo-01/packages/frontend/public/images/celular.webp"
  },
  {
    nombre: "Laptop Dell XPS 15",
    categorias: ["Tecnología", "Oficina"],
    precio: 250000,
    cantidad: 12,
    moneda: "ARS",
    imagen: "/home/fede/Escritorio/facultad/2025-2c-2c-lu-sa-grupo-01/packages/frontend/public/images/celular.webp"
  },
  {
    nombre: "Smartphone Samsung Galaxy S23",
    categorias: ["Tecnología"],
    precio: 180000,
    cantidad: 45,
    moneda: "ARS",
    imagen: "/home/fede/Escritorio/facultad/2025-2c-2c-lu-sa-grupo-01/packages/frontend/public/images/celular.webp"
  }
]);

    const [cantidad, setCantidad] = useState(1);

    return (
        <CardProducto/>
        // productosMock.length === 0 
        //     ? <CarritoVacio />
        //     : <CarritoLleno productos={productosMock} />
    )
}
