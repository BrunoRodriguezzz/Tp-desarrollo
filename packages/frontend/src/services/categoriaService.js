import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_URL_BACKEND || "http://localhost:8000";

export async function obtenerCategorias() {
  try {
    const response = await axios.get(`${API_BASE_URL}/categorias`);
    return response.data;
  } catch (error) {
    console.error("Error al buscar categorias:", error);
    throw error;
  }
}
