export function interpolarMensaje(plantillaMensaje, variables) {
    return plantillaMensaje.replace(/\{(\w+)\}/g, (_, key) => variables[key] ?? "");
}