import React, { useState } from "react";
import PropTypes from "prop-types";
import "./MisProductosBox.css";
import Skeleton from "@mui/material/Skeleton";
import { Dialog, DialogContent } from "@mui/material";
import { FormularioProducto } from "../../../formularioProducto/FormularioProducto";

export default function MisProductosBox({ producto }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [mostrarForm, setMostrarForm] = useState(false);

  const showForm = () => {
    setMostrarForm(true);
  }

  const handleClose = () => {
    setMostrarForm(false);
  }

  return (
    <div className="product-box">
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
          <button className="delete-button">
            Eliminar Producto
          </button>
        </div>
      </div>

      <Dialog open={mostrarForm} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogContent>
          <FormularioProducto producto={producto} />
        </DialogContent>
      </Dialog>
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