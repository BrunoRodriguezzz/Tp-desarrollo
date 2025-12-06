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
import { ProtectedRoute } from "./componentes/protectedRoute/ProtectedRoute.jsx";
import { AnimatePresence } from "framer-motion";
import PageWrapper from "./componentes/pageWrapper/PageWrapper.jsx";
import { MisProductos } from "./features/mis-productos/MisProductos.jsx";
import NotFound from "./features/notFound/NotFound.jsx";
import SessionProvider from "./features/auth/session/sessionContext.jsx";
import NotAllowed from "./features/notAllowed/NotAllowed.jsx";

function AppContent() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />}>
          {/* Rutas públicas */}
          <Route index element={<PageWrapper><Home /></PageWrapper>} />
          <Route path="productos" element={<PageWrapper><Productos /></PageWrapper>} />
          <Route path="productos/:id" element={<PageWrapper><ProductoDetailPage /></PageWrapper>} />
          <Route path="categorias" element={<PageWrapper><Categorias /></PageWrapper>} />
          <Route path="login" element={<PageWrapper><Login /></PageWrapper>} />
          <Route path="register" element={<PageWrapper><Register /></PageWrapper>} />

          {/* Rutas protegidas (autenticación y roles) */}
          <Route path="carrito" element={<PageWrapper><ProtectedRoute rol="COMPRADOR"><Carrito /></ProtectedRoute></PageWrapper>} />
          <Route path="notificaciones" element={<PageWrapper><ProtectedRoute><Notificaciones /></ProtectedRoute></PageWrapper>} />
          <Route path="pedidos" element={<PageWrapper><ProtectedRoute rol="COMPRADOR"><Pedidos /></ProtectedRoute></PageWrapper>} />
          <Route path="ventas" element={<PageWrapper><ProtectedRoute rol="VENDEDOR"><MisVentas /></ProtectedRoute></PageWrapper>} />
          <Route path="mis-productos" element={<PageWrapper><ProtectedRoute rol="VENDEDOR"><MisProductos /></ProtectedRoute></PageWrapper>} />
          <Route path="checkout" element={<PageWrapper><ProtectedRoute rol="COMPRADOR"><Checkout /></ProtectedRoute></PageWrapper>} />

          {/* Rutas de error */}
          <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
          <Route path="not-allowed" element={<PageWrapper><NotAllowed /></PageWrapper>} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <SessionProvider>
      <CartProvider>
        <BrowserRouter>
          <ScrollToTop />
          <AppContent />
        </BrowserRouter>
      </CartProvider>
    </SessionProvider>
  );
}