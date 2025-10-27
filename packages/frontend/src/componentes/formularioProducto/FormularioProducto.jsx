import React, { useState } from "react";
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  OutlinedInput,
  Chip,
  Box,
} from "@mui/material";
import categoriesMock from "../../mockData/Categories";
import "./FormularioProducto.css";

export function FormularioProducto({ producto, handleOpenSuccess, closeForm }) {
  const inicializarCampos = () => ({
    titulo: { valor: producto?.titulo || "", requerido: true },
    descripcion: { valor: producto?.descripcion || "", requerido: true },
    categoria: { valor: producto?.categorias || [], requerido: true },
    precio: { valor: producto?.precio || "", requerido: true },
    moneda: { valor: producto?.moneda || "", requerido: true },
    stock: { valor: producto?.stock || "", requerido: true },
  });

  const setValorDe = (campo) => (event) => {
    setCampos((prev) => ({
      ...prev,
      [campo]: { ...prev[campo], valor: event.target.value },
    }));
  };

  const [campos, setCampos] = useState(inicializarCampos());

  const handleForm = () => {
    closeForm();
    handleOpenSuccess();
  };

  const handleDeleteCategoria = (categoria) => {
    setCampos((prev) => ({
      ...prev,
      categoria: {
        ...prev.categoria,
        valor: prev.categoria.valor.filter((c) => c !== categoria),
      },
    }));
  };

  return (
    <div className="form-producto">
      <h1>Datos del Producto</h1>
      <p>Completa con los datos de tu producto</p>
      <form>
        <label>Titulo</label>
        <input
          type="text"
          placeholder="Titulo"
          onChange={setValorDe("titulo")}
          value={campos.titulo.valor}
        ></input>
        <label>Descripcion</label>
        <input
          type="text"
          placeholder="Descripcion"
          onChange={setValorDe("descripcion")}
          value={campos.descripcion.valor}
        ></input>
        <FormControl fullWidth margin="normal" size="small">
          <InputLabel>Categorías</InputLabel>
          <Select
            multiple
            value={campos.categoria.valor}
            onChange={setValorDe("categoria")}
            input={<OutlinedInput label="Categorías" />}
            renderValue={(selected) => (
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 0.5,
                  alignItems: "center",
                }}
              >
                {selected.map((value) => (
                  <Chip
                    key={value}
                    label={value}
                    onDelete={() => handleDeleteCategoria(value)}
                    size="small"
                  />
                ))}
              </Box>
            )}
            MenuProps={{
              PaperProps: {
                style: { maxHeight: 220 },
              },
            }}
          >
            {categoriesMock.map((cat) => (
              <MenuItem key={cat.name} value={cat.name}>
                {cat.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <label>Precio</label>
        <input
          type="text"
          placeholder="Precio"
          value={campos.precio.valor}
          onChange={setValorDe("precio")}
        ></input>
        <label>Moneda</label>
        <select
          value={campos.moneda.valor}
          onChange={setValorDe("moneda")}
          required={campos.moneda.requerido}
        >
          <option value="">Seleccioná una moneda</option>
          <option value="PESO_ARG">Peso Argentino (ARS)</option>
          <option value="DOLAR">Dólar (USD)</option>
          <option value="EURO">Euro (EUR)</option>
        </select>
        <label>Stock</label>
        <input
          type="number"
          placeholder="Stock"
          value={campos.stock.valor}
          onChange={setValorDe("stock")}
        ></input>
        <button type="button" className="btn-submit" onClick={handleForm}>
          {" "}
          Subir
        </button>
      </form>
    </div>
  );
}
