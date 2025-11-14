import React from "react";
import "./notAllowed.css";
import Seo from "../../componentes/seo/Seo";

export default function NotAllowed() {
  return (
    <div className="notallowed-container">
      <Seo
        title="Acceso no permitido | Tienda Sol"
        description="No tenés permiso para acceder a esta página. Volvé al inicio o explorá nuestros productos."
      />
      <h1 className="notallowed-title">Acceso no permitido</h1>
      <p className="notallowed-text">No tenés permiso para acceder a esta página.</p>
    </div>
  );
}