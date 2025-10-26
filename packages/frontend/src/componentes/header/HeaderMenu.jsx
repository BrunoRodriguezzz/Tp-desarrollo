import React, { useState } from "react";
import PropTypes from "prop-types";
import "./HeaderMenu.css";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function HeaderMenu({ onClose }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  return (
    <div className="header-menu">
      <div className="menu-search-bar" role="search" aria-label="Buscar productos">
        <input
          id="product-input-menu"
          type="text"
          placeholder="Buscar productos..."
          aria-label="Campo de búsqueda de productos"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              const trimmed = query.trim();
              if (trimmed)
                navigate(`/productos?search=${encodeURIComponent(trimmed)}`);
              else navigate(`/productos`);
              if (onClose) onClose();
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
            if (onClose) onClose();
          }}
        >
          <FaSearch aria-hidden="true" />
          Buscar
        </button> 
      </div>

      <ul className="header-menu-options">
        <li className="header-menu-button"><Link to="/productos" className="link" onClick={onClose}>Productos</Link></li>
        <li className="header-menu-button"><Link to="/categorias" className="link" onClick={onClose}>Categorías</Link></li>
        <li className="header-menu-button"><Link to="/carrito" className="link" onClick={onClose}>Carrito</Link></li>
        <li className="header-menu-button"><Link to="/login" className="link" onClick={onClose}>Iniciar Sesión</Link></li>
        <li className="header-menu-button"><Link to="/register" className="link" onClick={onClose}>Registrarse</Link></li>
      </ul>
    </div>
  );
}

HeaderMenu.propTypes = {
  onClose: PropTypes.func,
};

HeaderMenu.defaultProps = {
  onClose: () => {},
};
