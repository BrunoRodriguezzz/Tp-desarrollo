import Usuario from "../models/entities/usuario.js";
import { isString } from "./validadorTiposNativos.js";

export function validar(vendedor, titulo) {
  if (vendedor == null || !(vendedor instanceof Usuario)) {
    throw new Error("Vendedor inválido");
  }
  if (titulo == null || !isString(titulo)) {
    throw new Error("Título inválido");
  }
}
