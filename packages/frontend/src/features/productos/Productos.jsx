import React, { useMemo } from "react";
import "./Producto.css";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Filtros from "../../componentes/filtrosProductos/filtros";
import ProductList from "../../componentes/products/productList/ProductList.jsx";
import { useSearchParams } from "react-router-dom";

export default function Productos() {
    
    // En la URL van a estar TODOS los estados
    const [searchParams, setSearchParams] = useSearchParams();

    // El useMemo es para que estos objetos solo se re-calculen si la URL cambia.
    const { filtros, paginado } = useMemo(() => {
        
        const parseParams = () => {
            const params = Object.fromEntries(searchParams.entries());
            
            const currentFiltros = {
                news: params.news === 'true', // String --> Boolean
                search: params.search || null,
                categoria: params.categoria || null,
                minPrice: params.minPrice ? Number(params.minPrice) : null,
                maxPrice: params.maxPrice ? Number(params.maxPrice) : null,
                orderBy: params.orderBy || null
            };
            
            const currentPaginado = {
                page: params.page ? Number(params.page) : 1, 
                size: params.size ? Number(params.size) : 12
            };

            return { filtros: currentFiltros, paginado: currentPaginado };
        };

        return parseParams();
    }, [searchParams]);

    const actualizarFiltro = (clave, valor) => {
        const newParams = new URLSearchParams(searchParams);

        if (valor) {
            newParams.set(clave, valor);
        } else {
            newParams.delete(clave);
        }

        newParams.set('page', '1'); 
        
        setSearchParams(newParams);
    };

    const actualizarPaginado = (clave, valor) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set(clave, valor);
        setSearchParams(newParams);
    };

    return (
        <Container maxWidth="xl" className="contenidoPrincipal">
            <Grid container spacing={2} columns={20} className="contenedor-filtro-productos">
                <Grid  size={{ xs: 20, sm: 6, md: 4 }} sx={{ marginTop: 2 }} className="filtros-grid">
                    <Filtros
                        filtros={filtros} 
                        setFiltros={actualizarFiltro}
                    />
                </Grid>
                <Grid size={{ xs: 20, sm: 14, md: 16 }}> 
                    <ProductList
                        filtros={filtros}
                        paginado={paginado}
                        setPaginado={actualizarPaginado}
                    />
                </Grid>
            </Grid>
        </Container>
    );
}