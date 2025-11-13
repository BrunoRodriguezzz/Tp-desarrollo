import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_URL_BACKEND || "http://localhost:8000";

export async function getPedidos(idUsuario, page = 1, limit = 10) {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/pedidos/usuarios/` + idUsuario,
      {
        params: { page, limit },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al buscar pedidos:", error);
    throw error;
  }
}


//TODO - Falta probar bien, despues lo sigo
export async function cancelarPedido(token, idPedido, motivo) {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/pedidos/${idPedido}/cancelacion`,
      { motivo },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al cancelar el pedido:", error);
    throw error;
  }
}

export async function enviarPedido(token, idPedido, motivo) {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/pedidos/${idPedido}/envio`,
      { motivo },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al enviar el pedido:", error);
    throw error;
  }
}
