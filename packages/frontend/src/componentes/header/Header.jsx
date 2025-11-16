import React, { useState, useEffect } from "react";
import "./Header.css";
import HeaderMenu from "./HeaderMenu.jsx";
import { PiSunDim } from "react-icons/pi";
import { FaSearch } from "react-icons/fa";
import { LuShoppingCart } from "react-icons/lu";
import { IoMenu } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../carrito/cartContext/CartContext.jsx";
import { FaRegUser } from "react-icons/fa";
import { FaRegBell } from "react-icons/fa";
import { useSession } from "../../features/auth/session/sessionContext.jsx";
import { obtenerNotificaciones } from "../../services/notificacionService";
import { LuBellDot } from "react-icons/lu";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const { accessToken, notLogged, isVendedor, isComprador, logoutContext } = useSession();

  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    let mounted = true;

    async function fetchUnread() {
      if (!accessToken) {
        if (mounted) setUnreadCount(0);
        return;
      }

      try {
        const data = await obtenerNotificaciones(accessToken, false);
        if (mounted) setUnreadCount(Array.isArray(data.notificaciones) ? data.notificaciones.length : 0);
      } catch (err) {
        // No interrumpimos la UI si falla la consulta
        if (mounted) setUnreadCount(0);
        console.error("Error al obtener notificaciones:", err);
      }
    }

    fetchUnread();

    return () => {
      mounted = false;
    };
  }, [accessToken]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    logoutContext();
    navigate("/");
  };

  return (
    <>
      <header>
        <div
          className="brand-logo"
          role="link"
          tabIndex={0}
          aria-label="Ir al inicio de Tienda Sol"
          onClick={() => navigate("/")}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              navigate("/");
            }
          }}
        >
          <PiSunDim size={40} aria-hidden="true" />
          <span>Tienda Sol</span>
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
                if (trimmed)
                  navigate(`/productos?search=${encodeURIComponent(trimmed)}`);
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
              if (trimmed)
                navigate(`/productos?search=${encodeURIComponent(trimmed)}`);
              else navigate(`/productos`);
            }}
          >
            <FaSearch aria-hidden="true" />
            Buscar
          </button>
        </div>

        <div
          className="header-buttons"
          role="navigation"
          aria-label="Menú principal"
        >
          {isVendedor() && (
            <>
              <Link to="/ventas" className="button-transparent">
                Mis Ventas
              </Link>

              <Link to="/mis-productos" className="button-transparent">
                Mis Productos
              </Link>
            </>
          )}

          {isComprador() && (
            <Link to="/pedidos" className="button-transparent">
              Mis Pedidos
            </Link>
          )}

          <Link
            to="/carrito"
            className="button-gray"
            aria-label={`Ir al carrito, contiene ${totalItems} ${totalItems === 1 ? "producto" : "productos"}`}
          >
            <LuShoppingCart aria-hidden="true" />
            <span aria-hidden="true">
              {totalItems > 0
                ? `${totalItems} ítem${totalItems > 1 ? "s" : ""}`
                : "Carrito"}
            </span>
          </Link>

          {notLogged() ? (
            <Link to="/login" className="button-white-border">
              Iniciar Sesión
            </Link>
          ) : (
            <>
              <Link
                to="/notificaciones"
                className="button-transparent notifications-button"
                aria-label={
                  unreadCount > 0
                    ? `Tienes ${unreadCount} notificación${unreadCount > 1 ? "es" : ""} sin leer`
                    : "Ir a notificaciones"
                }
              >
                {unreadCount > 0 ? (
                  <LuBellDot aria-hidden="true" />
                ) : (
                  <FaRegBell aria-hidden="true" />
                )}
              </Link>

              <button
                type="button"
                className="button-transparent user-button"
                onClick={handleLogout}
              >
                <FaRegUser />
              </button>
            </>
          )}
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
