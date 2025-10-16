import React from "react";
import "./Home.css";
import ProductList from "../../componentes/products/productList/ProductList";

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

      <div className="list-title">
        <h1>Productos Destacados</h1>
        <p>Ver todos →</p>
      </div>

      <section className="products-list">
        <ProductList />
      </section>

      <section className="category-list">
        <h2>Explora por Categoría</h2>
      </section>

      <section className="why-tienda-sol">
        <h2>¿Por qué elegir Tienda Sol?</h2>
      </section>
    </>
  );
}
