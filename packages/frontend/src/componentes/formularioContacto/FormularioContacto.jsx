import "./FormularioContacto.css";
import { useState } from "react";

export default function FormularioContacto({
  direccion,
  setDireccion,
  errores,
  setErroresDireccion,
}) {
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setDireccion((prev) => ({
      ...prev,
      [name]: value,
    }));

    // limpio el error si arranca a escribir
    if (value.trim() !== "") {
      setErroresDireccion((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    setTouched((prev) => ({ ...prev, [name]: true }));

    // marco error si toca y sale del input
    if (value.trim() === "") {
      setErroresDireccion((prev) => ({
        ...prev,
        [name]: "Este campo es obligatorio",
      }));
    }
  };

  const renderInput = (label, name, type = "text", placeholder) => (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>

      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={direccion[name]}
        onChange={handleChange}
        onBlur={handleBlur}
      />

      {/* muestro errores si toca y no escribe o si toca comprar */}
      {(touched[name] || errores[name]) && errores[name] && (
        <p className="error-message">{errores[name]}</p>
      )}
    </div>
  );

  return (
    <div className="direccion-formulario">
      <h3>Dirección de Entrega</h3>

      {renderInput("Calle", "calle", "text", "Ingrese su calle")}
      {renderInput("Número", "numero", "number", "Ingrese su número")}
      {renderInput("Ciudad", "ciudad", "text", "Ingrese su ciudad")}
      {renderInput("Provincia", "provincia", "text", "Ingrese su provincia")}
      {renderInput("País", "pais", "text", "Ingrese su país")}
    </div>
  );
}
