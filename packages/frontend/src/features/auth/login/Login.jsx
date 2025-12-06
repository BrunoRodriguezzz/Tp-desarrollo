import React from "react";
import "./Login.css";
import { PiSunDim } from "react-icons/pi";
import { FaUserPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../../services/sessionService.js";
import { SnackbarSuccess } from "../../../componentes/snackbars/SnackBarSuccess.jsx";
import { SnackbarError } from "../../../componentes/snackbars/SnackBarError.jsx";
import Seo from "../../../componentes/seo/Seo";
import { useSession } from "../session/sessionContext.jsx";
import CircularProgress from "@mui/material/CircularProgress";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { loginContext } = useSession();

  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [mensajeError, setMensajeError] = useState("");
  const [loading, setLoading] = useState(false);

  const camposCompletos = email.trim() && password.trim();

  const handleSuccessClose = () => {
    setOpenSuccess(false);
  };

  const handleErrorClose = () => {
    setOpenError(false);
  };

  const handleLogin = async () => {
    if (!camposCompletos) {
      setMensajeError("Todos los campos son requeridos");
      setOpenError(true);
      return;
    }

    setLoading(true);
    const result = await login(email, password);

    if (!result || !result.token) {
      setMensajeError("Usuario o contraseña incorrectas");
      setLoading(false);
      setOpenError(true);
      return;
    }

    loginContext({
      token: result.token,
      refreshToken: result.refreshToken,
    });
    
    setOpenSuccess(true);
    setLoading(false);
    setTimeout(() => navigate("/"), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin();
  };

  return (
    <div className="login-container">
      <Seo
        title="Iniciar sesión | Tienda Sol"
        description="Accedé a tu cuenta para comprar y vender en Tienda Sol."
      />
      <div className="login-header">
        <div className="brand-logo">
          <PiSunDim size={50} />
        </div>
        <h1>Acceso al Sistema</h1>
        <p>Ingresa a tu cuenta de Tienda Sol</p>
      </div>
      <div className="login-card">
        <h2>Bienvenido de vuelta</h2>
        <p>Ingresa tus credenciales</p>
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          ></input>
          <label>Contraseña</label>
          <input
            name="password"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          ></input>
          <button type="submit" className="btn-login">
            Iniciar Sesión
          </button>
        </form>

        <hr className="divider" />

        <Link to="/register" className="btn-register">
          <FaUserPlus className="register-icon" />
          ¿No tienes cuenta? Regístrate aquí
        </Link>
      </div>

      <SnackbarSuccess
        mensaje={"El Inicio de Sesion fue Exitoso"}
        open={openSuccess}
        onClose={handleSuccessClose}
      />
      <SnackbarError
        mensaje={mensajeError}
        open={openError}
        onClose={handleErrorClose}
      />

       {loading && (
        <div className="loading-overlay">
          <CircularProgress size={60} thickness={4} />
        </div>
      )}
    </div>
  );
}
