// import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Layout from "./features/layout/Layout";
import Home from "./features/home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
