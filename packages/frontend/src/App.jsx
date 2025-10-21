import React from "react";
import Layout from "./features/layout/Layout";
import Home from "./features/home/Home";
import Productos from "./features/productos/Productos";
import ProductoDetailPage from "./features/productoDetailPage/ProductoDetailPage";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Categorias from "./features/categorias/Categorias";
import ScrollToTop from "./componentes/scrollToTop/ScrollToTop";
import Login from "./componentes/auth/login/Login";
import Register from "./componentes/auth/register/Register";
import Carrito from "./features/carrito/Carrito";
import Notificaciones from "./features/notificaciones/Notificaciones";
import { CartProvider } from "./componentes/carrito/cartContext/CartContext.jsx";

export default function App() {
  return (
    <>
      <CartProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="productos" element={<Productos />} />
              <Route path="/productos/:id" element={<ProductoDetailPage />} />
              <Route path="categorias" element={<Categorias />} />
              <Route path="login" element={<Login/>} />
              <Route path="register" element={<Register/>} />
              <Route path="carrito" element={<Carrito/>} />
              <Route path="notificaciones" element={<Notificaciones/>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </>
  );
}
