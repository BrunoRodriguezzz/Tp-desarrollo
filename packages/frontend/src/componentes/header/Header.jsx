import React from "react";
import "./Header.css";
import { PiSunDim } from "react-icons/pi";
import { FaSearch } from "react-icons/fa";
import { LuShoppingCart } from "react-icons/lu";
import { IoMenu } from "react-icons/io5";

export default function Header() {
  return (
    <header>
      <div className="brand-logo">
        <PiSunDim size={40} />
        <p>Tienda Sol</p>
      </div>

      <div className="search-bar">
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

      <div className="header-buttons">
        <button className="button-transparent">Productos</button>
        <button className="button-transparent">Categorías</button>
        <button className="button-gray">
          <LuShoppingCart />
          Carrito
        </button>
        <button className="button-white-border">Iniciar Sesión</button>
      </div>

      <button className="menu-button">
        <IoMenu />
      </button>
    </header>
  );
}
