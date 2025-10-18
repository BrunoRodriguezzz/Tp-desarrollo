import React from "react";
import Layout from "./features/layout/Layout";
import Home from "./features/home/Home";
import Productos from "./features/productos/Productos";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Categorias from "./features/categorias/Categorias";


export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="productos" element={<Productos />} />
            <Route path="categorias" element={<Categorias/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
