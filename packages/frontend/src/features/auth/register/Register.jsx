import React from "react";
import "./Register.css";
import { PiSunDim } from "react-icons/pi";
import { FaUserPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../../../services/sessionService.js";
import { SnackbarSuccess } from "../../../componentes/snackbars/SnackBarSuccess";
import { SnackbarError } from "../../../componentes/snackbars/SnackBarError";
import Seo from "../../../componentes/seo/Seo";
import { useSession } from "../session/sessionContext.jsx";
import CircularProgress from "@mui/material/CircularProgress";

export default function Register() {
  const inicializarCampo = (requerido = true) => ({ valor: "", requerido });
  const navigate = useNavigate();

  const inicializarCampos = () => ({
    nombre: inicializarCampo(),
    email: inicializarCampo(),
    telefono: inicializarCampo(),
    tipoUsuario: inicializarCampo(),
    password: inicializarCampo(),
    passwordConfirmation: inicializarCampo(),
  });

  const [campos, setCampos] = useState(inicializarCampos());
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [mensajeError, setMensajeError] = useState("");
  const { loginContext, accessToken, refreshToken } = useSession();
  const [loading, setLoading] = useState(false);

  const camposCompletos = Object.values(campos)
    .filter((campo) => campo.requerido)
    .every((campo) => campo.valor.trim() !== "");

  const setValorDe = (campo) => (event) => {
    setCampos((prev) => ({
      ...prev,
      [campo]: { ...prev[campo], valor: event.target.value },
    }));
  };

  const handleSuccessClose = () => {
    setOpenSuccess(false);
  };

  const handleErrorClose = () => {
    setOpenError(false);
  };

  const handleRegister = async () => {
    if (!camposCompletos) {
      setMensajeError("Todos los campos deben completarse");
      setOpenError(true);
      return;
    }

    if (!validarCampos(campos, setMensajeError, setOpenError)) {
      return null;
    }

    setLoading(true);
    const result = await signup(
      campos.nombre.valor,
      campos.email.valor,
      campos.telefono.valor,
      campos.tipoUsuario.valor,
      campos.password.valor,
      campos.passwordConfirmation.valor
    );

    if (!result || !result.token) {
      setMensajeError("Ha ocurrido un error durante el registro");
      setOpenError(true);
      setLoading(false);
      return;
    }

    loginContext({ token: result.token, refreshToken: result.refreshToken });

    setLoading(false)
    setOpenSuccess(true);

    setTimeout(() => navigate("/"), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleRegister();
  };

  return (
    <div className="register-container">
      <Seo
        title="Crear cuenta | Tienda Sol"
        description="Registrate para empezar a comprar y vender en Tienda Sol."
      />
      <div className="register-header">
        <div className="brand-logo">
          <PiSunDim size={50} />
        </div>
        <h1>Unite al Sistema</h1>
        <p>Crea tu cuenta de Tienda Sol</p>
      </div>
      <div className="register-card">
        <h2>Crear Cuenta</h2>
        <p>Ingresa tus datos</p>
        <form onSubmit={handleSubmit}>
          <label>Nombre</label>
          <input
            type="text"
            placeholder="Nombre"
            onChange={setValorDe("nombre")}
            value={campos.nombre.valor}
            required
          ></input>
          <label>Email</label>
          <input
            type="email"
            placeholder="example@mail.com"
            onChange={setValorDe("email")}
            value={campos.email.valor}
            required
          ></input>
          <label>Telefono</label>
          <input
            type="tel"
            placeholder="1160086203"
            onChange={setValorDe("telefono")}
            value={campos.telefono.valor}
            required
          ></input>
          <label htmlFor="tiposUsuarios">Tipo Usuario</label>
          <select
            id="tiposUsuarios"
            value={campos.tipoUsuario.valor}
            onChange={setValorDe("tipoUsuario")}
            required
          >
            <option value="">Seleccione el tipo de usuario</option>
            <option value={"COMPRADOR"}>Comprador</option>
            <option value={"VENDEDOR"}>Vendedor</option>
          </select>
          <label>Contraseña</label>
          <input
            type="password"
            placeholder="Contraseña"
            value={campos.password.valor}
            onChange={setValorDe("password")}
            required
          ></input>
          <label>Repetir Contraseña</label>
          <input
            type="password"
            placeholder="Repetir Contraseña"
            value={campos.passwordConfirmation.valor}
            onChange={setValorDe("passwordConfirmation")}
            required
          ></input>
          <button type="submit" className="btn-register">
            Registrarse
          </button>
        </form>

        <hr className="divider" />

        <Link to="/login" className="btn-login">
          <FaUserPlus className="login-icon" />
          ¿Ya tienes cuenta? Inicia Sesión
        </Link>
      </div>
      <SnackbarSuccess
        mensaje={"El Registro fue Exitoso"}
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

function validarCampos(campos, setMensajeError, setOpenError) {
  const email = campos.email.valor;
  const telefono = campos.telefono.valor;
  const password = campos.password.valor;
  const passwordConfirmation = campos.passwordConfirmation.valor;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const telefonoRegex = /^\d{10}$/;

  if (!emailRegex.test(email)) {
    setMensajeError("El email no tiene un formato valido");
    setOpenError(true);
    return false;
  }

  if (!telefonoRegex.test(telefono)) {
    setMensajeError("El telefono no tiene un formato valido");
    setOpenError(true);
    return false;
  }

  if (!(password === passwordConfirmation)) {
    setMensajeError("Las contraseñas deben coincidir");
    setOpenError(true);
    return false;
  }

  return true;
}
