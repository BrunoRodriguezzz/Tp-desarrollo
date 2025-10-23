import "./VentasBox.css"
import { FaCheck, FaBox } from "react-icons/fa";
import { Card, CardContent, Chip, Box, Divider, Button } from "@mui/material";
import {
  LocalShipping,
  AccessTime,
  CheckCircle,
  Inventory2,
  Home,
  Cancel,
} from "@mui/icons-material";

//TODO - Tengo que ver como hacer lo de los items
export default function VentasBox({pedido}) {
  const { _id, estado, fechaCreacion, items, total } = pedido;
  const enviable = !(estado.toLowerCase() === "entregado" || estado.toLowerCase() === "cancelado");

  const marcarEnviado = () => {
    alert('Se marco como enviado correctamente')
  }

  const status = getStatusConfig(estado);

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
          <Chip
            icon={status.icon}
            label={status.label}
            color={status.color}
            variant="outlined"
          />
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

function getStatusConfig(estado) {
  const statusConfig = {
      PENDIENTE: {
        label: "Pendiente",
        icon: <AccessTime fontSize="small" />,
        color: "warning",
      },
      CONFIRMADO: {
        label: "Confirmado",
        icon: <CheckCircle fontSize="small" />,
        color: "info",
      },
      EN_PREPARACION: {
        label: "En preparación",
        icon: <Inventory2 fontSize="small" />,
        color: "secondary",
      },
      ENVIADO: {
        label: "Enviado",
        icon: <LocalShipping fontSize="small" />,
        color: "primary",
      },
      ENTREGADO: {
        label: "Entregado",
        icon: <Home fontSize="small" />,
        color: "success",
      },
      CANCELADO: {
        label: "Cancelado",
        icon: <Cancel fontSize="small" />,
        color: "error",
      },
    };
  
    return statusConfig[estado];
}