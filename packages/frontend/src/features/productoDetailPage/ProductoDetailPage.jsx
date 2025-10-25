import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import productsMock from "../../mockData/Products.js";
import "./ProductoDetailPage.css";
import { useCart } from "../../componentes/carrito/cartContext/CartContext.jsx";

export default function ProductoDetailPage() {
  const { id } = useParams();
  const producto = productsMock.find((p) => p._id === id);

  const [cantidad, setCantidad] = useState(1);

  const incrementar = () => setCantidad((prev) => prev + 1);

  const decrementar = () => setCantidad((prev) => (prev > 1 ? prev - 1 : 1));

  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(producto);
  };

  if (!producto) {
    return (
      <div className="no-producto-detail-container">
        <h1>Producto no encontrado</h1>
        <p>Lo sentimos, no pudimos encontrar el producto que buscas.</p>
        <Link className="button-transparent" to="/productos">
          Volver a Productos
        </Link>
      </div>
    );
  }

  return (
    <div className="producto-detail-container">
      <div className="producto-imagen">
        <img src={producto.fotos[0]} alt={producto.titulo} />
      </div>
      <div className="producto-info">
        <p className="producto-categoria">
          {producto.categorias?.[0]?.toUpperCase()}
        </p>
        <h1 className="producto-titulo">{producto.titulo}</h1>
        <p className="producto-precio">
          {producto.precio.toLocaleString("es-AR", {
            style: "currency",
            currency: "ARS",
          })}
        </p>

        <div className="producto-bloque">
          <h3>Descripción</h3>
          <p>{producto.descripcion}</p>
        </div>

        <div className="producto-bloque">
          <h3>Categorías</h3>
          <div className="producto-tags">
            {producto.categorias?.map((cat, i) => (
              <span key={i}>{cat}</span>
            ))}
          </div>
        </div>

        <div className="producto-carrito">
          <div className="producto-cantidad">
            <h3>Cantidad:</h3>
            <div className="cantidad-control">
              <button onClick={decrementar}>-</button>
              <span>{cantidad}</span>
              <button onClick={incrementar}>+</button>
            </div>
          </div>
          <button className="button-transparent" onClick={handleAddToCart}>
            Agregar al Carrito
          </button>
        </div>
      </div>
    </div>
  );
}
