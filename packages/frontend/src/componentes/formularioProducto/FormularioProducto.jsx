import React, { useState } from "react";
import PropTypes from "prop-types";
import "./FormularioProducto.css"
import { SelectorCategorias } from "./selectorCategorias/SelectorCategorias";
import "./FormularioProducto.css";
import CargaFiles from "./cargaFiles/CargaFiles";

export function FormularioProducto({ producto, handleOpenSuccess, closeForm, handleOpenError, onSubmit }) {

  const inicializarCampos = () => ({
    titulo: { valor: producto?.titulo || "", requerido: true },
    descripcion: { valor: producto?.descripcion || "", requerido: true },
    categorias: { valor: producto?.categorias || [], requerido: false },
    precio: { valor: producto?.precio || "", requerido: true },
    moneda: { valor: producto?.moneda || "", requerido: true },
    stock: { valor: producto?.stock || "", requerido: true },
  });

  const [campos, setCampos] = useState(inicializarCampos());
  const [fotos, setFotos] = useState([]);

  const setValorDe = (campo) => (event) => {
    setCampos((prev) => ({
      ...prev,
      [campo]: { ...prev[campo], valor: event.target.value },
    }));
  };

  const setCategorias = (nuevasCategorias) => {
    setCampos((prev) => ({
      ...prev,
      categorias: { ...prev.categorias, valor: nuevasCategorias },
    }));
  };

  const camposCompletos = Object.values(campos)
    .filter(campo => campo.requerido)
    .every(campo => String(campo.valor).trim() !== '');

  const handleForm = async () => {
    if (!camposCompletos) {
      const camposFaltantes = Object.entries(campos)
        .filter(([_, campo]) => campo.requerido && String(campo.valor).trim() === '')
        .map(([nombre, _]) => nombre)
        .join(', ');
      console.log(`Faltan campos obligatorios: ${camposFaltantes}`);
      handleOpenError();
      return;
    }

    const datos = {
      titulo: campos.titulo.valor,
      descripcion: campos.descripcion.valor,
      categorias: campos.categorias.valor,
      precio: Number(campos.precio.valor),
      moneda: campos.moneda.valor,
      stock: Number(campos.stock.valor),
    };

    if (fotos && fotos.length > 0) {
      const formData = new FormData();
      formData.append("titulo", String(datos.titulo));
      formData.append("descripcion", String(datos.descripcion));
      formData.append("categorias", JSON.stringify(datos.categorias || []));
      formData.append("precio", Number(datos.precio));
      formData.append("moneda", String(datos.moneda));
      formData.append("stock", Number(datos.stock));
      fotos.forEach((file) => formData.append("fotos", file));
      await onSubmit(formData, true);
    } else {
      await onSubmit(datos, false);
    }
  };

  return (
    <div className="form-producto">
      <h1>Datos del Producto</h1>
      <p>Completa con los datos de tu producto</p>
      <form>
        <label>Titulo *</label>
        <input
            type="text"
            placeholder="Titulo"
            onChange={setValorDe('titulo')}
            value={campos.titulo.valor}
            required
        ></input>
        <label>Descripcion *</label>
        <input
          type="text"
          placeholder="Descripcion"
          onChange={setValorDe("descripcion")}
          value={campos.descripcion.valor}
        ></input>
        <label>Precio *</label>
        <input
            type="text"
            placeholder="Precio"
            value={campos.precio.valor}
            onChange={setValorDe('precio')}
            required
        ></input>
        <label htmlFor="monedas">Moneda *</label>
        <select
          id="monedas"
          value={campos.moneda.valor}
          onChange={setValorDe('moneda')}
          required
        >
          <option value="">Seleccione una moneda</option>
          <option value={"PESO_ARG"}>Peso Argentino</option>
          <option value={"DOLAR_USD"}>Dolar Estadounidense</option>
          <option value={"REAL"}>Reales</option>
        </select>
        <label>Stock *</label>
        <input
            type="number"
            placeholder="Stock"
            value={campos.stock.valor}
            onChange={setValorDe('stock')}
            required
        ></input>
        <label>Categorias</label>
        <SelectorCategorias
          categorias={campos.categorias.valor}
          setCategorias={setCategorias}
        />
        <label>Imágenes del producto</label>
        <CargaFiles onFilesChange={setFotos} maxCount={8} />
        <button type="button" className="btn-submit" onClick={handleForm}> Subir</button>
    </form>
    </div>
  );
}

FormularioProducto.propTypes = {
  producto: PropTypes.shape({
    titulo: PropTypes.string,
    descripcion: PropTypes.string,
    categorias: PropTypes.array,
    precio: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    moneda: PropTypes.string,
    stock: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  handleOpenSuccess: PropTypes.func,
  closeForm: PropTypes.func,
  handleOpenError: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
};

FormularioProducto.defaultProps = {
  producto: null,
  handleOpenSuccess: () => {},
  closeForm: () => {},
  handleOpenError: () => {},
};