import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_URL_BACKEND || "http://localhost:8000";

export async function obtenerNotificaciones(userId, leidas = undefined) {
  try {
    const params = { userId };
    if (leidas === false) {
      params.leida = false;
    }
    const response = await axios.get(`${API_BASE_URL}/notificaciones`, {
      params,
    });
    return response.data;
  } catch (error) {
    console.error("Error al buscar notificaciones:", error);
    throw error;
  }
}

export async function marcarNotificacionLeida(id) {
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/notificaciones/${id}/leida`
    );
    return response.data;
  } catch (error) {
    console.error("Error al leer notificacion:", error);
    throw error;
  }
}
