import { useState } from "react";
import ProductList from "../../componentes/products/productList/ProductList";
import "./MisProductos.css"
import MisProductosList from "../../componentes/products/misProductosList/MisProductosList";
import { Dialog, DialogContent } from "@mui/material";
import { FormularioProducto } from "../../componentes/formularioProducto/FormularioProducto";

export function MisProductos() {
  const [paginado, setPaginado] = useState({ page: 1, size: 12 });
  const [mostrarForm, setMostrarForm] = useState(false);
  
  const showForm = () => {
    setMostrarForm(true);
  }

  const handleClose = () => {
    setMostrarForm(false);
  }
  
  const actualizarPaginado = (clave, valor) => {
    setPaginado((prev) => ({
      ...prev,
      [clave]: valor,
    }));
  };

  return (
    <div className="mis-productos-container">
      <div className="mis-productos-header">
        <div className="mis-productos-left">
          <h1>Mis productos</h1>
          <p>Administra tus productos</p>
        </div>
        <div className="mis-productos-right">
          <button className="create-button" onClick={showForm}> + Crear Producto</button>
        </div>
      </div>
      <div className="mis-productos-list">
        <MisProductosList
          limit={12}
          filtros={{}}
          paginado={paginado}
          setPaginado={actualizarPaginado}
        />
      </div>
      <Dialog open={mostrarForm} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogContent>
          <FormularioProducto />
        </DialogContent>
      </Dialog>
    </div>
  )
}