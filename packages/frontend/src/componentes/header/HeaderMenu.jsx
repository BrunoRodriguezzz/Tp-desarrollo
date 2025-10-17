import React from "react";
import "./HeaderMenu.css";
import { FaSearch } from "react-icons/fa";

export default function HeaderMenu() {
  return (
    <div className="header-menu">
      <div className="menu-search-bar">
        <input
          id="product-input"
          type="text"
          placeholder="Buscar productos..."
        />

        <button className="button-transparent">
          <FaSearch />
          Buscar
        </button>
      </div>

      <ul className="header-menu-options">
        <li className="header-menu-button">Productos</li>
        <li className="header-menu-button">Categorías</li>
        <li className="header-menu-button">Carrito</li>
        <li className="header-menu-button">Iniciar Sesión</li>
        <li className="header-menu-button">Registrarse</li>
      </ul>
    </div>
  );
}
