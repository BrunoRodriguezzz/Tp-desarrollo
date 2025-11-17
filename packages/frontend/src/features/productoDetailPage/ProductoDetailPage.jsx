import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./ProductoDetailPage.css";
import { useCart } from "../../componentes/carrito/cartContext/CartContext.jsx";
import { buscarProductoPorId } from "../../services/productoService.js";
import ProductDetailSkeleton from "../../componentes/skeletons/SkeletonProductoDetail.jsx";
import { SnackbarSuccess } from "../../componentes/snackbars/SnackBarSuccess.jsx";
import { Carousel } from 'antd';
import Seo from "../../componentes/seo/Seo";

export default function ProductoDetailPage() {
  const { id } = useParams();
  const [cargando, setCargando] = useState(false);
  const [producto, setProducto] = useState(null);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const [cantidad, setCantidad] = useState(1);

  const incrementar = () => setCantidad((prev) => prev + 1);

  const decrementar = () => setCantidad((prev) => (prev > 1 ? prev - 1 : 1));

  const handleClose = () => {
    setOpenSuccess(false);
  };

  const { addToCartQuantity } = useCart();

  const currencySymbols = {
    PESO_ARG: "AR$",
    DOLAR_USA: "US$",
    REAL: "R$",
    EURO: "€",
  };

  const currencySymbol = currencySymbols[producto?.moneda] ?? "$";

  const formattedPrice =
    typeof producto?.precio === "number"
      ? producto.precio.toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        })
      : (producto?.precio ?? "");

  useEffect(() => {
    const findById = async () => {
      try {
        setCargando(true);
        const producto = await buscarProductoPorId(id);
        setProducto(producto);
      } catch (error) {
        console.error("No se encontro el producto", error);
      } finally {
        setCargando(false);
      }
    };
    findById();
  }, [id]);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCartQuantity(producto, cantidad);
    setOpenSuccess(true);
  };

  if (cargando) {
    return <ProductDetailSkeleton />;
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

  const seoDescription = producto.descripcion
    ? producto.descripcion.length > 160
      ? producto.descripcion.slice(0, 157) + "..."
      : producto.descripcion
    : undefined;

  return (
    <div className="producto-detail-container">
      <Seo
        title={`${producto.titulo} | Tienda Sol`}
        description={seoDescription}
      />
      <div className="producto-imagen-wrapper">
        {!imgLoaded && <ProductDetailSkeleton />}
        <Carousel arrows arrowSize={30}>
          {(producto.fotos || []).map((foto, index) => (
            <div key={index}>
              <img
                className="producto-imagen"
                src={foto}
                alt={`${producto.titulo} - Imagen ${index + 1}`}
                onLoad={() => setImgLoaded(true)}
                onError={() => setImgLoaded(true)}
              />
            </div>
          ))}
        </Carousel>
      </div>

      <div className="producto-info">
        <h1 className="producto-titulo">{producto.titulo}</h1>
        <p className="producto-categoria">
          Vendedor: {producto.vendedor.nombre}
        </p>
        <p className="producto-precio">
          {currencySymbol}
          {formattedPrice}
        </p>
        <p className="producto-categoria">
          Unidades disponibles: {producto.stock}
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
          <button className="button-gray" onClick={handleAddToCart}>
            Agregar al Carrito
          </button>
        </div>
      </div>

      <SnackbarSuccess
        mensaje="Se agrego el producto al carrito"
        open={openSuccess}
        onClose={handleClose}
      />
    </div>
  );
}
