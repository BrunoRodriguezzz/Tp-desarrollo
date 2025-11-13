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

export async function crearPedido(token, items, campos) {
  try {
    console.log("Entro a crear Pedido");
    const pedido = armarPedido(items, campos);
    console.log("Pedido a enviar:", JSON.stringify(pedido, null, 2));
    const response = await axios.post(`${API_BASE_URL}/pedidos`, pedido, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al crear el pedido:", error);
    throw error;
  }
}

function armarPedido(items, campos) {
  return {
    items: items.map((item) => ({
      productoId: item._id,
      cantidad: item.quantity,
      precioUnitario: item.precio,
    })),
    moneda: items[0]?.moneda,
    direccion: {
      ciudad: {
        nombre: campos.ciudad.valor,
        provincia: {
          nombre: campos.provincia.valor,
          pais: {
            nombre: campos.pais.valor,
          },
        },
      },
      domicilio: {
        calle: campos.calle.valor,
        altura: campos.altura.valor,
        piso: campos.piso?.valor || "",
        departamento: campos.departamento?.valor || "",
        codigoPostal: campos.codigoPostal?.valor || "",
      },
    },
  };
}

//TODO - Falta probar bien, despues lo sigo
export async function cancelacionPedido(token, idPedido, motivo) {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/pedidos/${idPedido}/cancelacion`,
      { motivo },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al cancelar el pedido:", error);
    throw error;
  }
}

export async function envioPedido(token, idPedido, motivo) {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/pedidos/${idPedido}/envio`,
      { motivo },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al enviar el pedido:", error);
    throw error;
  }
}
