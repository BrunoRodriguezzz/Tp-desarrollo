import "./VentasBox.css"
import { FaCheck, FaBox } from "react-icons/fa";

//TODO - Tengo que ver como hacer lo de los items
export default function VentasBox({pedido}) {
  const { estado, fechaCreacion, total } = pedido;
  const enviable = !(estado.toLowerCase() === "entregado" || estado.toLowerCase() === "cancelado");

  const marcarEnviado = () => {
    alert('Se marco como enviado correctamente')
  }

  const fecha = new Date(fechaCreacion);
  const fechaFormateada = fecha.toLocaleDateString("es", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
      <div className={`pedido-box ${enviable ? "enviable" : "no-enviable"}`}>
        <div className="pedido-contenido">
          <div>
          <FaBox size={22}/>
          </div>
          <div className="pedido-texto">
            <h1>{estado.toUpperCase()}</h1>
            <h2>${total}</h2>
            <p>{fechaFormateada}</p>
          </div>
        </div>
        {enviable && (
          <div className="button-wrapper">
            <button className="enviado-button" onClick={marcarEnviado}>
            <FaCheck/>
            Marcar como Enviado
            </button>
      </div>
        )}
      </div>
    );
}