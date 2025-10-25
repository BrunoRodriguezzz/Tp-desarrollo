import "./FormularioContacto.css";
import { useState } from "react";

export default function FormularioContacto({direccion, setDireccion}) {

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDireccion((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="direccion-formulario">
      <h3>Dirección de Entrega</h3>
      <div className="form-group">
        <label htmlFor="calle">Calle</label>
        <input
          type="text"
          id="calle"
          name="calle"
          placeholder="Ingrese su calle"
          value={direccion.calle}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="numero">Número</label>
        <input
          type="number"
          id="numero"
          name="numero"
          placeholder="Ingrese su número"
          value={direccion.numero}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="ciudad">Ciudad</label>
        <input
          type="text"
          id="ciudad"
          name="ciudad"
          placeholder="Ingrese su ciudad"
          value={direccion.ciudad}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="provincia">Provincia</label>
        <input
          type="text"
          id="provincia"
          name="provincia"
          placeholder="Ingrese su provincia"
          value={direccion.provincia}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="pais">País</label>
        <input
          type="text"
          id="pais"
          name="pais"
          placeholder="Ingrese su país"
          value={direccion.pais}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
