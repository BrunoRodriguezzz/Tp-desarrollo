import CarritoVacio from "../../componentes/carrito/CarritoVacio/CarritoVacio"


export default function Carrito() {
    const productos = [
    {
        "nombre": "Zapatillas Nike Air 2",
        "categorias": ["Deportes", "Tecnología"],
        "precio": 10772.94,
        "cantidad": 29
    },
    {
        "nombre": "Laptop Dell XPS 15",
        "categorias": ["Tecnología", "Oficina"],
        "precio": 250000,
        "cantidad": 12
    },
    {
        "nombre": "Smartphone Samsung Galaxy S23",
        "categorias": ["Tecnología"],
        "precio": 180000,
        "cantidad": 45
        }]

    return(
        <CarritoVacio/>
    )
}
