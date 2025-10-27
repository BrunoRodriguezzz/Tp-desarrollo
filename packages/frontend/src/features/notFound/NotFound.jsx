import React from "react";
import "./NotFound.css";
import Seo from "../../componentes/seo/Seo";

export default function NotFound() {
  return (
    <div className="notfound-container">
      <Seo
        title="Página no encontrada | Tienda Sol"
        description="La página que estás buscando no existe o fue movida. Volvé al inicio o explorá nuestros productos."
      />
      <h1 className="notfound-title">404</h1>
      <p className="notfound-text">Página no encontrada</p>
    </div>
  );
}