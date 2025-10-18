import React, { useState } from "react";
import "./Producto.css";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Filtros from "../../componentes/filtrosProductos/filtros";
import categoriesMock from "../../mockData/Categories.js";
import ProductList from "../../componentes/products/productList/ProductList.jsx";

export default function Productos() {
    
    // Estados para los filtros    
    const [soloNuevos, setSoloNuevos] = useState(false);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
    const [minPrecio, setMinPrecio] = useState(null);
    const [maxPrecio, setMaxPrecio] = useState(null);
    const [ordenamiento, setOrdenamiento] = useState(null);
    
    const filtros = {soloNuevos, categoriaSeleccionada, minPrecio, maxPrecio, ordenamiento};
    
    // Data
    const categorias = categoriesMock.map(cat => cat.name);

    
    return (
        <Container maxWidth="xl" className="contenidoPrincipal">
            <Grid container spacing={2} columns={20} className="contenedor-filtro-productos">
                <Grid size={{ xs: 20, sm: 6, md: 4 }} sx={{ marginTop: 2, }} className="filtros-grid">
                    <Filtros
                        categorias={categorias}
                        soloNuevos={soloNuevos}
                        setSoloNuevos={setSoloNuevos}
                        categoriaSeleccionada={categoriaSeleccionada}
                        setCategoriaSeleccionada={setCategoriaSeleccionada}
                        setMinPrecio={setMinPrecio}
                        setMaxPrecio={setMaxPrecio}
                        setOrdenamiento={setOrdenamiento}
                    />
                </Grid>
                <Grid size={{ xs: 20, sm: 14, md: 16 }}>
                    <ProductList
                        filtros={filtros}
                    />
                </Grid>
            </Grid>
        </Container>
    );
}