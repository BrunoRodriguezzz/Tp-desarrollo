import "./Login.css";
import { PiSunDim } from "react-icons/pi";
import { FaUserPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const camposCompletos = email.trim() && password.trim();

    const handleLogin = () => {
        alert('Inicio de sesion correcto');
        navigate("/")
     };

    return (
        <>
        <div className="login-container">
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
                    <button type="button" className="btn-login" onClick={handleLogin}
                    disabled = {!camposCompletos} >
                        Iniciar Sesión</button>
                </form>

                <hr className="divider" />

                <Link to="/register" className="btn-register">
                    <FaUserPlus className="register-icon"/>
                    ¿No tienes cuenta? Regístrate aquí
                </Link>
            </div>
        </div>
        </>
    )
}