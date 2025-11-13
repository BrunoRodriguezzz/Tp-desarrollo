import React from "react";
import "./FormularioContacto.css";
import { useState } from "react";
import propTypes from "prop-types";

export default function FormularioContacto({ campos, setValorDe }) {
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
      <div className="form-group">
        <label htmlFor="calle">Calle *</label>
        <input
          type="text"
          id="calle"
          name="calle"
          placeholder="Ingrese su calle"
          value={campos.calle.valor}
          onChange={setValorDe("calle")}
        />
      </div>
      <div className="form-group">
        <label htmlFor="altura">Altura *</label>
        <input
          type="number"
          id="altura"
          name="altura"
          placeholder="Ingrese su altura"
          value={campos.altura.valor}
          onChange={setValorDe("altura")}
        />
      </div>
      <div className="form-group">
        <label htmlFor="piso">Piso</label>
        <input
          type="number"
          id="piso"
          name="piso"
          placeholder="Ingrese su piso"
          value={campos.piso.valor}
          onChange={setValorDe("piso")}
        />
      </div>
      <div className="form-group">
        <label htmlFor="departamento">Departamento</label>
        <input
          type="number"
          id="departamento"
          name="departamento"
          placeholder="Ingrese su departamento"
          value={campos.departamento.valor}
          onChange={setValorDe("departamento")}
        />
      </div>
      <div className="form-group">
        <label htmlFor="codigoPostal">Código Postal</label>
        <input
          type="number"
          id="codigoPostal"
          name="codigoPostal"
          placeholder="Ingrese su código postal"
          value={campos.codigoPostal.valor}
          onChange={setValorDe("codigoPostal")}
        />
      </div>
      <div className="form-group">
        <label htmlFor="ciudad">Ciudad *</label>
        <input
          type="text"
          id="ciudad"
          name="ciudad"
          placeholder="Ingrese su ciudad"
          value={campos.ciudad.valor}
          onChange={setValorDe("ciudad")}
        />
      </div>
      <div className="form-group">
        <label htmlFor="provincia">Provincia *</label>
        <input
          type="text"
          id="provincia"
          name="provincia"
          placeholder="Ingrese su provincia"
          value={campos.provincia.valor}
          onChange={setValorDe("provincia")}
        />
      </div>
      <div className="form-group">
        <label htmlFor="pais">País *</label>
        <input
          type="text"
          id="pais"
          name="pais"
          placeholder="Ingrese su país"
          value={campos.pais.valor}
          onChange={setValorDe("pais")}
        />
      </div>
    </div>
  );
}

FormularioContacto.propTypes = {
  campos: propTypes.object.isRequired,
  setValorDe: propTypes.func.isRequired,
};
