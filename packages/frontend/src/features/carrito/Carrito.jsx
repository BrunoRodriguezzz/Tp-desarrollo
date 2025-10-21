import { useEffect, useState } from "react";
import CarritoLleno from "../../componentes/carrito/carritoLleno/CarritoLleno"
import CarritoVacio from "../../componentes/carrito/CarritoVacio/CarritoVacio"
import Counter from "../../componentes/counter/Counter"
import CardProducto from "../../componentes/carrito/carritoLleno/cardProducto/CardProducto";
import "./Carrito.css"

export default function Carrito() {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        setProductos(cart);
    }, []);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(productos));
    }, [productos]);

    console.log(productos);

    const eliminarProducto = (nombreProducto) => {
        setProductos(productos.filter(producto => producto.titulo !== nombreProducto));
    }

    const modificarCantidad = (nombreProducto, nuevaCantidad) => {
        setProductos(productos.map(producto => {
            if(producto.titulo === nombreProducto) {
                return {...producto, quantity: nuevaCantidad};
            }
            return producto;
        }));
    }


    return (
        // <CardProducto
        //     nombre={productos[0]?.titulo || "Producto de ejemplo"}
        //     categorias={productos[0]?.categorias || ["Categoria1", "Categoria2"]}
        //     precio={productos[0]?.precio || 100}
        //     cantidad={productos[0]?.quantity || 1}
        //     moneda={productos[0]?.moneda || "PESO_ARG"}
        //     foto={productos[0]?.fotos?.[0] || "https://via.placeholder.com/150"}
        //     onDelete={eliminarProducto}
        //     modificarCantidad={modificarCantidad}
        // />
        productos.length === 0 
            ? <CarritoVacio />
            : <CarritoLleno productos={productos} />
    )
}
