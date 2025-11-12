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
