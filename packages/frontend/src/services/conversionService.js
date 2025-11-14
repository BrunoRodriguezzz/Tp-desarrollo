import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_URL_BACKEND || "http://localhost:8000";

export async function obtenerTotal(cart) {
  try {
    const body = { cart };
    const response = await axios.post(`${API_BASE_URL}/conversion`, body);
    return response.data;
  } catch (error) {
    console.error("Error al calcular total:", error);
    throw error;
  }
}
