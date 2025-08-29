import Usuario from "../models/entities/usuario.js";
import { isString } from "./validadorTiposNativos.js";

export function validar(vendedor, titulo, id) {
  if (vendedor == null || !(vendedor instanceof Usuario)) {
    throw new Error("Vendedor inválido");
  }
  if (titulo == null || !isString(titulo)) {
    throw new Error("Título inválido");
  }
  if (id == null || !isString(id)) {
    throw new Error("ID de producto inválido");
  }
}
