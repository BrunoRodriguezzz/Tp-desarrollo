import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import productsMock from "../../mockData/Products.js";
import "./ProductoDetailPage.css";
import { useCart } from "../../componentes/carrito/cartContext/CartContext.jsx";
import { buscarProductoPorId } from "../../services/productoService.js";
import ProductDetailSkeleton from "../../componentes/skeletons/SkeletonProductoDetail.jsx";

export default function ProductoDetailPage() {
  const { id } = useParams();
  const [cargando, setCargando] = useState(false);
  const [producto, setProducto] = useState(null);

  const [cantidad, setCantidad] = useState(1);

  const incrementar = () => setCantidad((prev) => prev + 1);

  const decrementar = () => setCantidad((prev) => (prev > 1 ? prev - 1 : 1));

  const { addToCart } = useCart();

  useEffect(() => {
    const findById = async () => {
      try {
        setCargando(true);
        const producto = await buscarProductoPorId(id);
        setProducto(producto);
      }
      catch (error) {
        console.error("No se encontro el producto", error);
      }
      finally {
        setCargando(false);
      }
    }
    findById();
  }, [id]) 

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(producto);
  };

  if(cargando) {
    return (
      <ProductDetailSkeleton />
    );
  }

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
      <img className="producto-imagen" src={producto.fotos[0]} alt={producto.titulo} />

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
