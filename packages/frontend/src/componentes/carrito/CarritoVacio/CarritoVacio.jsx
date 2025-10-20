
import { Link } from "react-router-dom";
import "./CarritoVacio.css";
import { LuShoppingCart } from "react-icons/lu";

export default function CarritoVacio() {
  return (
    <div className="carrito-vacio">
      <LuShoppingCart className="carrito-icono"/>
      <h2 className="carrito-titulo">Tu carrito está vacío</h2>
      <p className="carrito-subtitulo">¡Agrega productos para comenzar tu compra!</p>
      <Link
        to={{
          pathname: "/productos",
        }}
        className="carrito-boton"
      >
        Ver productos
      </Link>
    </div>
  )
}
