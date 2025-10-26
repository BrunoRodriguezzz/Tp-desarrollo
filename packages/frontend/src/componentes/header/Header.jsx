import React, { useState } from "react";
import "./Header.css";
import HeaderMenu from "./HeaderMenu.jsx";
import { PiSunDim } from "react-icons/pi";
import { FaSearch } from "react-icons/fa";
import { LuShoppingCart } from "react-icons/lu";
import { IoMenu } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../carrito/cartContext/CartContext.jsx";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <header>
        <div className="brand-logo">
          <PiSunDim size={40} />
          <Link to="/" aria-label="Ir al inicio de Tienda Sol">
            Tienda Sol
          </Link>
        </div>

        <div className="search-bar" role="search" aria-label="Buscar productos">
          <input
            id="product-input"
            type="text"
            placeholder="Buscar productos..."
            aria-label="Campo de búsqueda de productos"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                const trimmed = query.trim();
                if (trimmed) navigate(`/productos?search=${encodeURIComponent(trimmed)}`);
                else navigate(`/productos`);
              }
            }}
          />

          <button
            type="button"
            className="button-transparent"
            aria-label="Ejecutar búsqueda"
            onClick={() => {
              const trimmed = query.trim();
              if (trimmed) navigate(`/productos?search=${encodeURIComponent(trimmed)}`);
              else navigate(`/productos`);
            }}
          >
            <FaSearch aria-hidden="true" />
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

      {menuOpen && <HeaderMenu onClose={() => setMenuOpen(false)} />}
    </>
  );
}
