export function esNoNuloNiUndefined(tipoClase, ...valores) {
  valores.forEach((valor, index) => {
    if (valor == null || valor == undefined) {
      throw new Error(
        `El valor ingresado en la posición '${index + 1}' es nulo o indefinido en la clase: "${tipoClase}"`
      );
    }
  });
}