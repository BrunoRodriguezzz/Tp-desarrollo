import React from "react";
import Header from "../../componentes/header/Header";
import Footer from "../../componentes/footer/Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
