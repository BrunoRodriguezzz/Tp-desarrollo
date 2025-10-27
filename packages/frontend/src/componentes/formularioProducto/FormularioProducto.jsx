import { useState } from "react";
import "./FormularioProducto.css"
import { SelectorCategorias } from "./selectorCategorias/SelectorCategorias";

export function FormularioProducto({ producto, handleOpenSuccess, closeForm, handleOpenError, obligatorio = false }) {
  const inicializarCampo = (requerido = true) => ({ valor: '', requerido });

  const inicializarCampos = () => ({
    titulo: inicializarCampo(),
    descripcion: inicializarCampo(),
    precio: inicializarCampo(),
    moneda: inicializarCampo(),
    stock: inicializarCampo()
  });

  const [campos, setCampos] = useState(inicializarCampos());
  const [categorias, setCategorias] = useState([]);

  const setValorDe = (campo) => (event) => {
    setCampos(prev => ({
      ...prev,
      [campo]: { ...prev[campo], valor: event.target.value }
    }));
  };

  const camposCompletos = Object.values(campos)
    .filter(campo => campo.requerido)
    .every(campo => campo.valor.trim() !== '');

  const handleForm = () => {
    if(obligatorio && !camposCompletos)
    {
      handleOpenError();
      return;
    }
    closeForm();
    handleOpenSuccess();
  }

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
        <label>Descripcion</label>
        <input
            type="text"
            placeholder="Descripcion"
            onChange={setValorDe('descripcion')}
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
          categorias={categorias}
          setCategorias={setCategorias}
        />
        <button type="button" className="btn-submit" onClick={handleForm}> Subir</button>
    </form>
    </div>
  )
}