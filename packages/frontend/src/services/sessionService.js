import axios from "axios";

// BARLA PIDE PERDON POR ESTO
const API_BASE_URL =
  // process.env.REACT_APP_URL_BACKEND || "http://localhost:8000";
  process.env.REACT_APP_URL_BACKEND || "https://tiendasolapi.syspa.es";

export async function login(email, password) {
  try {
    const response = await axios.post(`${API_BASE_URL}/usuarios/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error durante la autenticación:", error);
    return null;
  }
}

export async function signup(
  nombre,
  email,
  telefono,
  tipoUsuario,
  password,
  passwordConfirm
) {
  try {
    const response = await axios.post(`${API_BASE_URL}/usuarios`, {
      nombre,
      email,
      telefono,
      tipoUsuario,
      password,
      passwordConfirm,
    });
    return response.data;
  } catch (error) {
    console.error("Error durante la autenticación:", error);
    return null;
  }
}
