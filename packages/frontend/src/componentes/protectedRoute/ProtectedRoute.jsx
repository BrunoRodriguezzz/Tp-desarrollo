import React from "react";
import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import { useSession } from "../../features/auth/session/sessionContext";

export function ProtectedRoute({ children, rol }) {
  const { notLogged, isVendedor, isComprador } = useSession();
  const location = useLocation();

  if (notLogged()) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (rol) {
    let hasRole = false;
    if (rol === "VENDEDOR") {
      hasRole = isVendedor();
    } else if (rol === "COMPRADOR") {
      hasRole = isComprador();
    }

    // No tiene Rol
    if (!hasRole) {
      return <Navigate to="/not-allowed" replace state={{ from: location.pathname }} />;
    }
  }

  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  rol: PropTypes.string,
};

ProtectedRoute.defaultProps = {
  rol: undefined,
};