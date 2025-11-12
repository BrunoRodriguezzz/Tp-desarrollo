import React, { createContext, useContext, useState, useMemo } from "react";
import PropTypes from "prop-types";
import { jwtDecode } from "jwt-decode";

const SessionContext = createContext(null);

export default function SessionProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);

  function loginContext(tokens) {
    setAccessToken(tokens.token);
    setRefreshToken(tokens.refreshToken);
  }

  function logoutContext() {
    setAccessToken(null);
    setRefreshToken(null);
  }

  function refreshAccessTokenContext(token) {
    setAccessToken(token);
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
