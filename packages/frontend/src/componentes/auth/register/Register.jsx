import "./Register.css";
import { PiSunDim } from "react-icons/pi";
import { FaUserPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
	const inicializarCampo = (requerido = true) => ({ valor: '', requerido });
  const navigate = useNavigate()

  const inicializarCampos = () => ({
    nombre: inicializarCampo(),
    email: inicializarCampo(),
    telefono: inicializarCampo(),
    password: inicializarCampo(),
    passwordConfirmation: inicializarCampo()
  });

  const [campos, setCampos] = useState(inicializarCampos());

  const camposCompletos = Object.values(campos)
    .filter(campo => campo.requerido)
    .every(campo => campo.valor.trim() !== '');

  const setValorDe = (campo) => (event) => {
    setCampos(prev => ({
      ...prev,
      [campo]: { ...prev[campo], valor: event.target.value }
    }));
  };

	const handleRegister = () => {
			alert('Registro correcto');
			navigate("/login");
	};

	return (
			<>
			<div className="register-container">
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
							<form>
									<label>Nombre</label>
									<input
											type="text"
											placeholder="Nombre"
											onChange={setValorDe('nombre')}
											value={campos.nombre.valor}
											required
									></input>
									<label>Email</label>
									<input
											type="email"
											placeholder="Email"
											onChange={setValorDe('email')}
											value={campos.email.valor}
											required
									></input>
									<label>Telefono</label>
									<input
											type="telefono"
											placeholder="Telefono"
											onChange={setValorDe('telefono')}
											value={campos.telefono.valor}
											required
									></input>
									<label>Contraseña</label>
									<input
											type="password"
											placeholder="Contraseña"
											value={campos.password.valor}
											onChange={setValorDe('password')}
											required
									></input>
									<label>Repetir Contraseña</label>
									<input
											type="password"
											placeholder="Repetir Contraseña"
											value={campos.passwordConfirmation.valor}
											onChange={setValorDe('passwordConfirmation')}
											required
									></input>
									<button type="button" className="btn-register" onClick={handleRegister}
									disabled = {!camposCompletos} >
											Registrarse</button>
							</form>

							<hr className="divider" />

							<Link to="/login" className="btn-login">
									<FaUserPlus className="login-icon"/>
									¿Ya tienes cuenta? Inicia Sesión
							</Link>
					</div>
			</div>
			</>
	)
}