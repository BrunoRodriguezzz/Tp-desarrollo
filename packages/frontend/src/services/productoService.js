import productsMock from "../mockData/Products.js";
import axios from "axios";

// BARLA PIDE PERDON POR ESTO
const API_BASE_URL =
  // process.env.REACT_APP_URL_BACKEND || "http://localhost:8000";
  process.env.REACT_APP_URL_BACKEND || "https://tiendasolapi.syspa.es";

export async function buscarProductosMock(limit, currentPage, filtros = {}) {
  await new Promise((res) => setTimeout(res, 1000));
  const { news, categoria, minPrice, maxPrice, orderBy } = filtros;

  let prodFiltrado = productsMock;

  if (news) {
    // TODO: Implementar filtro de productos nuevos
  }

  if (categoria) {
    prodFiltrado = prodFiltrado.filter((product) =>
      product.categorias.includes(categoria)
    );
  }

  if (typeof minPrice === "number" && minPrice >= 0) {
    prodFiltrado = prodFiltrado.filter((product) => product.precio >= minPrice);
  }

  if (typeof maxPrice === "number" && maxPrice >= 0) {
    prodFiltrado = prodFiltrado.filter((product) => product.precio <= maxPrice);
  }

  // Eliminar productos duplicados (por _id)
  const uniqueProducts = [];
  const seenIds = new Set();

  prodFiltrado.forEach((product) => {
    if (!seenIds.has(product._id)) {
      seenIds.add(product._id);
      uniqueProducts.push(product);
    }
  });

  prodFiltrado = uniqueProducts;

  if (orderBy) {
    const productosOrdenar = [...prodFiltrado];

    switch (orderBy) {
      case "best_seller":
        productosOrdenar.sort((a, b) => {
          if (b.ventas !== a.ventas) {
            return b.ventas - a.ventas;
          }
          return a._id.localeCompare(b._id);
        });
        break;

      case "price_asc":
        productosOrdenar.sort((a, b) => {
          if (a.precio !== b.precio) {
            return a.precio - b.precio;
          }
          return a._id.localeCompare(b._id);
        });
        break;

      case "price_desc":
        productosOrdenar.sort((a, b) => {
          if (b.precio !== a.precio) {
            return b.precio - a.precio;
          }
          return a._id.localeCompare(b._id);
        });
        break;

      default:
        break;
    }

    prodFiltrado = productosOrdenar;
  }

  const inicio = (currentPage - 1) * limit;
  const fin = inicio + limit;
  const productosPagina = prodFiltrado.slice(inicio, fin);
  const totalPages = Math.ceil(prodFiltrado.length / limit);

  return { totalPages, productosPagina };
}

export async function buscarProductos(limit, currentPage, filtros = {}) {
  try {
    console.log("Buscando productos con filtros:", filtros);
    const response = await axios.get(`${API_BASE_URL}/productos`, {
      params: {
        ...filtros,
        limit,
        page: currentPage,
      },
    });
    return {
      totalPages: response.data.totalPages,
      productosPagina: response.data.data,
    };
  } catch (error) {
    console.error("Error al buscar productos:", error);
    throw error;
  }
}

export async function buscarProductoPorId(id) {
  try {
    const response = await axios.get(`${API_BASE_URL}/productos/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al buscar productos:", error);
    throw error;
  }
}

export async function crearProducto(producto, token) {
  try {
    console.log("Token:", token);
    const response = await axios.post(`${API_BASE_URL}/productos`, producto, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al crear el producto:", error);
    throw error;
  }
}

export async function buscarMisProductos(limit, currentPage, token) {
  try {
    const response = await axios.get(`${API_BASE_URL}/productos/usuarios`, {
      params: {
        limit,
        page: currentPage,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const normalizeUrl = (foto) => {
      if (!foto) return foto;
      if (/^https?:\/\//i.test(foto)) return foto;
      const base = API_BASE_URL.replace(/\/$/, "");
      const path = String(foto).replace(/^\/+/, "");
      return `${base}/${path}`;
    };

    const productosConFotos = Array.isArray(response.data.data)
      ? response.data.data.map((prod) => {
          const fotos = Array.isArray(prod.fotos)
            ? prod.fotos.map(normalizeUrl)
            : prod.fotos;
          return { ...prod, fotos };
        })
      : response.data.data;

    return {
      totalPages: response.data.totalPages,
      productosPagina: productosConFotos,
    };
  } catch (error) {
    console.error("Error al buscar productos:", error);
    throw error;
  }
}

export async function actualizarProducto(id, producto, token) {
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/productos/${id}`,
      producto,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    throw error;
  }
}

export async function eliminarProducto(id, token) {
  try {
    const response = await axios.delete(`${API_BASE_URL}/productos/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    throw error;
  }
}
