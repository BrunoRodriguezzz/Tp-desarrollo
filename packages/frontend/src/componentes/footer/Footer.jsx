import React from "react";
import "./Footer.css";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer>
      <div className="footer-main">
        <div className="tienda-sol-contact">
          <span>Tienda Sol</span>

          <p>
            Tu marketplace de confianza para comprar y vender productos de
            calidad. Conectamos compradores y vendedores en un entorno seguro y
            confiable.
          </p>

          <div className="social-buttons">
            <button className="button-social">
              <FaFacebook />
            </button>

            <button className="button-social">
              <FaInstagram />
            </button>

            <button className="button-social">
              <FaXTwitter />
            </button>
          </div>
        </div>

        <div className="footer-options">
          <ul className="footer-list">
            <p>Comprar</p>
            <li>Todos los Productos</li>
            <li>Categorías</li>
            <li>Ofertas</li>
            <li>Nuevos Productos</li>
          </ul>

          <ul className="footer-list">
            <p>Vender</p>
            <li>Crear Cuenta de Vendedor</li>
            <li>Panel de Vendedor</li>
            <li>Guía para Vendedores</li>
            <li>Comisiones y Tarifas</li>
          </ul>

          <ul className="footer-list">
            <p>Ayuda</p>
            <li>Centro de ayuda</li>
            <li>Contacto</li>
            <li>Envíos y Entregas</li>
            <li>Devoluciones</li>
          </ul>
        </div>
      </div>

      <div className="footer-copyright">
        <p>© 2025 Tienda Sol. Todos los derechos reservados.</p>
        <p>
          Metodos de pago:
          <span>💳 🏦 📱</span>
        </p>
      </div>
    </footer>
  );
}
