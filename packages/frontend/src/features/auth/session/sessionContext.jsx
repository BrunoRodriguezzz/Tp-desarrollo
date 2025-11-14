import React, { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { jwtDecode } from "jwt-decode";

const SessionContext = createContext(null);

export default function SessionProvider({ children }) {
  // Inicializar desde localStorage para persistir sesión tras recarga
  const [accessToken, setAccessToken] = useState(() => {
    try {
      return localStorage.getItem("accessToken");
    } catch (err) {
      return null;
    }
  });

  const [refreshToken, setRefreshToken] = useState(() => {
    try {
      return localStorage.getItem("refreshToken");
    } catch (err) {
      return null;
    }
  });

  function loginContext(tokens) {
    setAccessToken(tokens.token);
    setRefreshToken(tokens.refreshToken);

    try {
      if (tokens.token) localStorage.setItem("accessToken", tokens.token);
      if (tokens.refreshToken)
        localStorage.setItem("refreshToken", tokens.refreshToken);
    } catch (err) {
      // TODO
    }
  }

  function logoutContext() {
    setAccessToken(null);
    setRefreshToken(null);
    try {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    } catch (err) {
      // ignorar
    }
  }

  function refreshAccessTokenContext(token) {
    setAccessToken(token);
    try {
      if (token) localStorage.setItem("accessToken", token);
    } catch (err) {
      // ignorar
    }
  }

  function isTokenValid(token) {
    if (!token) return false;
    const payload = decodeToken(token);
    if (!payload) return false;
    // Si no hay exp asumimos inválido
    if (!payload.exp) return false;
    return Date.now() / 1000 < payload.exp;
  }

  function isTokenExpired(token) {
    if (!token) return true;
    const payload = decodeToken(token);
    if (!payload || !payload.exp) return true;
    return Date.now() / 1000 >= payload.exp;
  }

  function isVendedor() {
    const user = getUserFromToken();
    return !!user && user.tipo === "VENDEDOR";
  }

  function isComprador() {
    const user = getUserFromToken();
    return !!user && user.tipo === "COMPRADOR";
  }

  function decodeToken(token) {
    try {
      return jwtDecode(token);
    } catch (err) {
      // token inválido o malformado
      return null;
    }
  }

  function getUserFromToken() {
    // Intenta con accessToken primero, si no existe usa refreshToken
    const token = accessToken || refreshToken;
    if (!token) return null;
    const payload = decodeToken(token);
    if (!payload) return null;

    const { id, email, nombre, tipo } = payload;
    return { id, email, nombre, tipo };
  }

  function getIdFromToken() {
    const user = getUserFromToken();
    return user ? user.id : null;
  }

  // Si los tokens en localStorage cambian (p. ej. por otra pestaña), sincronizamos
  useEffect(() => {
    function handleStorage(e) {
      if (e.key === "accessToken") setAccessToken(e.newValue);
      if (e.key === "refreshToken") setRefreshToken(e.newValue);
    }

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  function notLogged() {
    return !isTokenValid(accessToken);
  }

  return (
    <SessionContext.Provider
      value={{
        accessToken,
        refreshToken,
        loginContext,
        logoutContext,
        refreshAccessTokenContext,
        isTokenValid,
        isTokenExpired,
        isVendedor,
        isComprador,
        notLogged,
        getUserFromToken,
        getIdFromToken,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export const useSession = () => {
  const context = useContext(SessionContext);

  if (!context) {
    throw new Error("useSession debe ser usado dentro de un SessionProvider");
  }

  return context;
};

SessionProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
