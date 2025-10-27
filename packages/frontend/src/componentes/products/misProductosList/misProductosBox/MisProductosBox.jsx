import React, { useState } from "react";
import PropTypes from "prop-types";
import "./MisProductosBox.css";
import Skeleton from "@mui/material/Skeleton";
import { Dialog, DialogContent } from "@mui/material";
import { FormularioProducto } from "../../../formularioProducto/FormularioProducto.jsx";
import { SnackbarSuccess } from "../../../snackbars/SnackBarSuccess.jsx"
import { SnackbarError } from "../../../snackbars/SnackBarError.jsx";
 
export default function MisProductosBox({ producto }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const showForm = () => {
    setMostrarForm(true);
  }

  const handleCloseForm = () => {
    setMostrarForm(false);
  }

  const handleOpenEdit = () => {
    setOpenSuccess(false);
    setMensaje("El producto se actualizo correctamente");
    setTimeout(() => setOpenSuccess(true), 100);
  }

  const handleOpenDelete = () => {
    setOpenSuccess(false);
    setMensaje("El producto se elimino correctamente");
    setTimeout(() => setOpenSuccess(true), 100);
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

  return (
    <div className="mis-productos-box">
      <div className="product-image-wrapper" style={{ position: "relative" }}>
        {!imgLoaded && (
          <Skeleton
            variant="rectangular"
            className="product-image"
            sx={{ minHeight: "3.5rem" }}
          />
        )}
        <img
          src={producto.fotos[0]}
          alt={producto.titulo}
          className="product-image"
          onLoad={() => setImgLoaded(true)}
          onError={() => setImgLoaded(true)}
          style={{ display: imgLoaded ? "block" : "none" }}
        />
      </div>
      <div className="product-content">
        <div className="product-text">
          <p className="product-category-stock">{producto.categorias[0]}</p>
          <h2 className="product-name">{producto.titulo}</h2>
          <p className="product-price">${producto.precio}</p>
          <p className="product-category-stock">Stock: {producto.stock}</p>
        </div>

        <div className="button-wrapper">
          <button className="edit-button" onClick={showForm}>
            Editar Producto
          </button>
          <button className="delete-button" onClick={handleOpenDelete}>
            Eliminar Producto
          </button>
        </div>
      </div>

      <Dialog open={mostrarForm} onClose={handleCloseForm} maxWidth="sm" fullWidth>
        <DialogContent>
          <FormularioProducto 
          producto={producto}
          handleOpenSuccess={handleOpenEdit}
          closeForm={handleCloseForm}
          handleOpenError={handleOpenError}
           />
        </DialogContent>
      </Dialog>
      <SnackbarSuccess
        mensaje={mensaje}
        open={openSuccess}
        onClose={handleCloseSuccess}
      />
      <SnackbarError
        mensaje="Todos los campos obligatorios(*) deben estar completos"
        open={openError}
        onClose={handleCloseError}
      />
    </div>
  );
}

MisProductosBox.propTypes = {
  producto: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    fotos: PropTypes.array.isRequired,
    titulo: PropTypes.string.isRequired,
    precio: PropTypes.number.isRequired,
    categorias: PropTypes.array.isRequired,
  }).isRequired,
};