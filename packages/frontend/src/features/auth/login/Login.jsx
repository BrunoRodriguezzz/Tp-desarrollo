import React from "react";
import "./Login.css";
import { PiSunDim } from "react-icons/pi";
import { FaUserPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import usuariosMock from "../../../mockData/Users.js";
import { useSession } from "../session/SessionContext";
import { SnackbarSuccess } from "../../../componentes/snackbars/SnackBarSuccess.jsx";
import { SnackbarError } from "../../../componentes/snackbars/SnackBarError.jsx";
import Seo from "../../../componentes/seo/Seo";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [mensajeError, setMensajeError] = useState("");

  const { setUserType } = useSession();

  const camposCompletos = email.trim() && password.trim();

  const handleSuccessClose = () => {
    setOpenSuccess(false);
  };

  const handleErrorClose = () => {
    setOpenError(false);
  };

  const handleLogin = () => {
    if (!camposCompletos) {
      setMensajeError("Todos los campos son requeridos");
      setOpenError(true);
      return;
    }

    const usuario = usuariosMock.find(
      (u) => u.email === email && u.password === password
    );

    if (!usuario) {
      setMensajeError("Usuario o contraseña incorrectas");
      setOpenError(true);
      return;
    }

    try {
      setUserType(usuario.tipo);
    } catch (e) {
      // Sinceramente no se que haria aca
    }

    setOpenSuccess(true);
    setTimeout(() => navigate("/"), 2000);
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
        <form>
          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          ></input>
          <label>Contraseña</label>
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          ></input>
          <button type="button" className="btn-login" onClick={handleLogin}>
            {" "}
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
    </div>
  );
}
