import { React, useState } from "react";
import ProductList from "../../componentes/products/productList/ProductList";
import "./MisProductos.css"
import MisProductosList from "../../componentes/products/misProductosList/MisProductosList";
import { Dialog, DialogContent } from "@mui/material";
import { FormularioProducto } from "../../componentes/formularioProducto/FormularioProducto";
import { SnackbarSuccess } from "../../componentes/snackbars/SnackBarSuccess";
import { SnackbarError } from "../../componentes/snackbars/SnackBarError";
import Seo from "../../componentes/seo/Seo";
import { crearProducto } from "../../services/productoService";
import { useSession } from "../../features/auth/session/sessionContext";

export function MisProductos() {
  const { accessToken } = useSession();
  const [paginado, setPaginado] = useState({ page: 1, size: 12 });
  const [mostrarForm, setMostrarForm] = useState(false);
  const [reload, setReload] = useState(0);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  
  const showForm = () => {
    setMostrarForm(true);
  }

  const handleCloseForm = () => {
    setMostrarForm(false);
  }

  const handleOpenSuccess = () => {
    setOpenSuccess(true);
  }

  const handleCloseSuccess = () => {
    setOpenSuccess(false);
  }

  const handleOpenError = () => {
    setOpenError(true);
  }

  const handleCloseError = () => {
    setOpenError(false);
  }

  const handleSubmit = async (datos) => {
    try {
      await crearProducto(datos, accessToken);
      handleOpenSuccess();
      setMostrarForm(false);
      setReload((k) => k + 1);
    } catch (error) {
      handleOpenError();
    }
  };
  
  const actualizarPaginado = (clave, valor) => {
    setPaginado((prev) => ({
      ...prev,
      [clave]: valor,
    }));
  };

  return (
    <div className="mis-productos-container">
      <Seo
        title="Mis productos | Tienda Sol"
        description="Administrá tus productos y creá nuevos fácilmente."
      />
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
          reload={reload}
          onRefresh={() => setReload((k) => k + 1)}
        />
      </div>
      <Dialog open={mostrarForm} onClose={handleCloseForm} maxWidth="sm" fullWidth>
        <DialogContent>
          <FormularioProducto
            handleOpenSuccess={handleOpenSuccess}
            closeForm={handleCloseForm}
            handleOpenError={handleOpenError}
            onSubmit={handleSubmit}
          />
        </DialogContent>
      </Dialog>
      <SnackbarSuccess
        mensaje="El producto se creo correctamente"
        open={openSuccess}
        onClose={handleCloseSuccess}
      />
      <SnackbarError
        mensaje="Todos los campos obligatorios(*) deben estar completos"
        open={openError}
        onClose={handleCloseError}
      />
    </div>
  )
}