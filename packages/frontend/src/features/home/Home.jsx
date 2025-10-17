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

        <div className="why-container">
          <div className="why-box">
            <span>🚚</span>

            <h3>Envío Rápido</h3>

            <p>
              Recibe tus productos en tiempo récord con nuestro servicio de
              envío express.
            </p>
          </div>

          <div className="why-box">
            <span>🔒</span>

            <h3>Compra Segura</h3>

            <p>
              Protección del comprador y pagos seguros en todas tus
              transacciones.
            </p>
          </div>

          <div className="why-box">
            <span>💎</span>

            <h3>Calidad Garantizada</h3>

            <p>
              Productos verificados y vendedores confiables para tu
              tranquilidad.
            </p>
          </div>

          <div className="why-box">
            <span>💬</span>

            <h3>Soporte 24/7</h3>

            <p>
              Nuestro equipo está disponible para ayudarte en cualquier momento.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
