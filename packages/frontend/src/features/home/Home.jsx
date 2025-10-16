import React from "react";
import "./Home.css";
import ProductBox from "../../componentes/products/productBox/ProductBox";

export default function Home() {
  return (
    <>
      <section className="home-banner">
        <h1>Bienvenido A Tienda Sol</h1>

        <p>
          Descubre productos de calidad al mejor precio. Tu marketplace de
          confianza para comprar y vender.
        </p>

        <div className="banner-buttons">
          <button className="button-white">Ver Productos</button>
          <button className="button-transparent-border">
            Vender en Tienda Sol
          </button>
        </div>
      </section>

      <section className="products-list">
        <ProductBox
          name="Producto 1"
          price="100"
          image="https://via.placeholder.com/150"
        />
      </section>

      <section className="pagination">
        <h1>paginacion</h1>
      </section>
    </>
  );
}
