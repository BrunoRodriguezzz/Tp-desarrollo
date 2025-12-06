import React from "react";
import { useCart } from "../../componentes/carrito/cartContext/CartContext";
import CarritoLleno from "../../componentes/carrito/carritoLleno/CarritoLleno";
import CarritoVacio from "../../componentes/carrito/CarritoVacio/CarritoVacio";
import { motion, AnimatePresence } from "framer-motion";
import Seo from "../../componentes/seo/Seo";

export default function Carrito() {
  const { totalItems } = useCart();
  return (
    <AnimatePresence mode="wait">
      <Seo
        title="Tu carrito | Tienda Sol"
        description="Revisá y gestioná los productos de tu carrito antes de finalizar la compra."
      />
      {totalItems === 0 ? (
        <motion.div
          key="vacio"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          <CarritoVacio />
        </motion.div>
      ) : (
        <motion.div
          key="lleno"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          <CarritoLleno />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
