import React from "react";
import Layout from "./features/layout/Layout";
import Home from "./features/home/Home";
import Productos from "./features/productos/Productos";
import ProductoDetailPage from "./features/productoDetailPage/ProductoDetailPage";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Categorias from "./features/categorias/Categorias";
import ScrollToTop from "./componentes/scrollToTop/ScrollToTop";
import Login from "./features/auth/login/Login";
import Register from "./features/auth/register/Register";
import Carrito from "./features/carrito/Carrito";
import Notificaciones from "./features/notificaciones/Notificaciones";
import Pedidos from "./features/pedidos/Pedidos";
import { CartProvider } from "./componentes/carrito/cartContext/CartContext.jsx";
import MisVentas from "./features/ventas/MisVentas.jsx";
import Checkout from "./features/checkout/Checkout.jsx";
import ProtectedCheckout from "./componentes/protectedCheckout/ProtectedCheckout.jsx";
import { AnimatePresence, motion } from "framer-motion";
import PageWrapper from "./componentes/pageWrapper/PageWrapper.jsx";

function AppContent() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />}>
          <Route index element={<PageWrapper><Home /></PageWrapper>} />
          <Route path="productos" element={<PageWrapper><Productos /></PageWrapper>} />
          <Route path="/productos/:id" element={<PageWrapper><ProductoDetailPage /></PageWrapper>} />
          <Route path="categorias" element={<PageWrapper><Categorias /></PageWrapper>} />
          <Route path="login" element={<PageWrapper><Login /></PageWrapper>} />
          <Route path="register" element={<PageWrapper><Register /></PageWrapper>} />
          <Route path="carrito" element={<PageWrapper><Carrito /></PageWrapper>} />
          <Route path="notificaciones" element={<PageWrapper><Notificaciones /></PageWrapper>} />
          <Route path="pedidos" element={<PageWrapper><Pedidos /></PageWrapper>} />
          <Route path="mis-ventas" element={<PageWrapper><MisVentas /></PageWrapper>} />
          <Route
            path="checkout"
            element={
              <ProtectedCheckout>
                <PageWrapper><Checkout /></PageWrapper>
              </ProtectedCheckout>
            }
          />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <ScrollToTop />
        <AppContent />
      </BrowserRouter>
    </CartProvider>
  );
}