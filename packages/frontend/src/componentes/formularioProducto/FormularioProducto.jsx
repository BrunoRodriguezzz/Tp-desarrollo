import { useState } from "react";
import "./FormularioProducto.css"

export function FormularioProducto({ producto }) {
  const inicializarCampo = (requerido = true) => ({ valor: '', requerido });

  const inicializarCampos = () => ({
    titulo: inicializarCampo(),
    descripcion: inicializarCampo(),
    categoria: inicializarCampo(),
    precio: inicializarCampo(),
    moneda: inicializarCampo(),
    stock: inicializarCampo()
  });

  const setValorDe = (campo) => (event) => {
    setCampos(prev => ({
      ...prev,
      [campo]: { ...prev[campo], valor: event.target.value }
    }));
  };

  const [campos, setCampos] = useState(inicializarCampos());

  return (
    <div className="form-producto">
      <h1>Datos del Producto</h1>
      <p>Completa con los datos de tu producto</p>
      <form>
        <label>Titulo</label>
        <input
            type="text"
            placeholder="Titulo"
            onChange={setValorDe('titulo')}
            value={campos.titulo.valor}
        ></input>
        <label>Descripcion</label>
        <input
            type="text"
            placeholder="Descripcion"
            onChange={setValorDe('descripcion')}
            value={campos.descripcion.valor}
        ></input>
        <label>Categoria</label>
        <input
            type="text"
            placeholder="Categoria"
            onChange={setValorDe('categoria')}
            value={campos.categoria.valor}
        ></input>
        <label>Precio</label>
        <input
            type="text"
            placeholder="Precio"
            value={campos.precio.valor}
            onChange={setValorDe('precio')}
        ></input>
        <label>Moneda</label>
        <input
            type="text"
            placeholder="Moneda"
            value={campos.moneda.valor}
            onChange={setValorDe('moneda')}
        ></input>
        <label>Stock</label>
        <input
            type="number"
            placeholder="Stock"
            value={campos.stock.valor}
            onChange={setValorDe('stock')}
        ></input>
        <button type="button" className="btn-submit"> Subir</button>
    </form>
    </div>
  )
}