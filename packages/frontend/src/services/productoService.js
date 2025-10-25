import { set } from "mongoose";
import productsMock from "../mockData/Products.js";
import axios from "axios";

const API_BASE_URL = process.env.URL_BACKEND || "http://localhost:8000";

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
  await new Promise((res) => setTimeout(res, 1000));
  try {
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
