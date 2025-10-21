import CarritoLleno from "../../componentes/carrito/carritoLleno/CarritoLleno"
import CarritoVacio from "../../componentes/carrito/CarritoVacio/CarritoVacio"


export default function Carrito() {
    const productosMock = [
    {
        nombre: "Zapatillas Nike Air 2",
        categorias: ["Deportes", "Tecnología"],
        precio: 10772.94,
        cantidad: 29,
        moneda: "ARS"
    },
    {
        nombre: "Laptop Dell XPS 15",
        categorias: ["Tecnología", "Oficina"],
        precio: 250000,
        cantidad: 12,
        moneda: "ARS"
    },
    {
        nombre: "Smartphone Samsung Galaxy S23",
        categorias: ["Tecnología"],
        precio: 180000,
        cantidad: 45,
        moneda: "ARS"
    }
    ];

    return(
        // <CarritoVacio/>
        <CarritoLleno
            productos={productosMock}
        />
    )
}
