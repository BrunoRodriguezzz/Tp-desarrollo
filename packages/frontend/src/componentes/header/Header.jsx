import React, { useState } from "react";
import "./Header.css";
import HeaderMenu from "./HeaderMenu.jsx";
import { PiSunDim } from "react-icons/pi";
import { FaSearch } from "react-icons/fa";
import { LuShoppingCart } from "react-icons/lu";
import { IoMenu } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { useCart } from "../carrito/cartContext/CartContext.jsx";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems } = useCart();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <header>
        <div className="brand-logo">
          <PiSunDim size={40} />
          <Link to="/">Tienda Sol</Link>
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
          <Link to="/productos" className="button-transparent">
            Productos
          </Link>

          <Link to="/categorias" className="button-transparent">
            Categorías
          </Link>
          
          <Link to="/carrito" className="button-gray">
            <LuShoppingCart />
            {totalItems > 0 ? 
            (<span>{totalItems} ítem{totalItems > 1 ? "s" : ""}</span>)
            :
            (<span>Carrito</span>)}
          </Link>

          <Link to="/login" className="button-white-border">
            Iniciar Sesión
          </Link>
        </div>

        {!menuOpen && (
          <button
            className="open-menu-button"
            onClick={toggleMenu}
            aria-label="Abrir menú"
          >
            <IoMenu />
          </button>
        )}

        {menuOpen && (
          <button
            className="close-menu-button"
            onClick={toggleMenu}
            aria-label="Cerrar menú"
          >
            <RxCross2 />
          </button>
        )}
      </header>

      {menuOpen && <HeaderMenu />}
    </>
  );
}
