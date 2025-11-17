import axios from "axios";

const API_BASE_URL =
  // process.env.REACT_APP_URL_BACKEND || "http://localhost:8000";
  process.env.REACT_APP_URL_BACKEND || "https://tiendasolapi.syspa.es";

export async function obtenerNotificaciones(token, leidas = undefined) {
  try {
    const response = await axios.get(`${API_BASE_URL}/notificaciones`, {
      params: {
        leida: leidas,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al buscar notificaciones:", error);
    throw error;
  }
}

export async function marcarNotificacionLeida(token, id) {
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/notificaciones/${id}/leida`,
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al leer notificacion:", error);
    throw error;
  }
}
