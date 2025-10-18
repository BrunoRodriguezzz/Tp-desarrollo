import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./filtros.css";
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import Switch from "@mui/material/Switch";
import Paper from '@mui/material/Paper';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";

// Iconos
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CategoryIcon from '@mui/icons-material/Category';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import SortIcon from '@mui/icons-material/Sort';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import StarIcon from '@mui/icons-material/Star';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

export default function Filtros({ 
    categorias, 
    soloNuevos, 
    setSoloNuevos, 
    categoriaSeleccionada, 
    setCategoriaSeleccionada, 
    setMinPrecio, 
    setMaxPrecio, 
    setOrdenamiento 
}) {
  const handleClick = () => {
    setOpen((prev) => !prev);
  };
  const [open, setOpen] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const header = document.querySelector('header');
    if (header) setHeaderHeight(header.offsetHeight);
    const handleResize = () => {
      if (header) setHeaderHeight(header.offsetHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      className="filtros-container"
      style={{ position: 'sticky', top: headerHeight ? headerHeight + 12 : 8, zIndex: 1 }}
    >
      <Paper sx={{ p: 1, textAlign: "center" }} elevation={4} square={false}>
        <div className="lo-nuevo">
          <div className="icono-texto">
            <NewReleasesIcon />
            <span>Lo nuevo!</span>
          </div>
          <Switch
            checked={soloNuevos}
            onChange={(_, checked) => setSoloNuevos(checked)}
            inputProps={{ 'aria-label': 'Mostrar solo productos nuevos' }}
          />
        </div>
      </Paper>

      <Paper sx={{ p: 1, textAlign: "center", marginTop: 2, paddingTop: 2 }} elevation={4} square={false}>
        <div className="icono-texto">
            <CategoryIcon />
            <span>Categoria</span>
          </div>
        <Autocomplete
            disablePortal
            options={categorias}
            renderInput={(params) => <TextField {...params} placeholder="Seleccionar" />}
            className="input-categoria"
             sx={{
                // Elimina el borde del input
                '& .MuiOutlinedInput-root': {
                    '& fieldset': { border: 'none' },
                    '&:hover fieldset': { border: 'none' },
                    '&.Mui-focused fieldset': { border: 'none' }
                }
            }}
            value={categoriaSeleccionada}
            onChange={(_, newValue) => setCategoriaSeleccionada(newValue)}
        />
      </Paper>

      <Paper sx={{ p: 1, textAlign: "center", marginTop: 2 }} elevation={4} square={false}>
        <div className="icono-texto">
            <AttachMoneyIcon />
            <span>Precio</span>
        </div>
        <div className="input-precio">
            <TextField type="number" label="Min" variant="outlined" size="small" sx={{ marginRight: 1 }}  onChange={(e) => setMinPrecio(e.target.value === '' ? null : Number(e.target.value))} />
            <p>-</p>
            <TextField type="number" label="Max" variant="outlined" size="small" sx={{ marginLeft: 1 }} onChange={(e) => setMaxPrecio(e.target.value === '' ? null : Number(e.target.value))} />
        </div>
      </Paper>

      <Paper sx={{ p: 1, textAlign: "center", marginTop: 2 }} elevation={4} square={false}>
        <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <SortIcon />
        </ListItemIcon>
        <ListItemText primary="Ordenar según" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

        <Collapse in={open} timeout="auto" unmountOnExit >
          <List disablePadding>
            <ListItemButton onClick={() => setOrdenamiento("masVendidos")}>
                <ListItemIcon>
                    <StarIcon />
                </ListItemIcon>
                <ListItemText primary="Más vendidos" />
            </ListItemButton >
            <ListItemButton onClick={() => setOrdenamiento("precioBajoAlto")}>
                <ListItemIcon>
                    <ArrowDownwardIcon />
                </ListItemIcon>
                <ListItemText primary="Precio más bajo" />
            </ListItemButton>
            <ListItemButton onClick={() => setOrdenamiento("precioAltoAbajo")}>
                <ListItemIcon>
                    <ArrowUpwardIcon />
                </ListItemIcon>
                <ListItemText primary="Precio más alto" />
            </ListItemButton>
          </List>
        </Collapse>
      </Paper>
    </div>
  );
}

Filtros.propTypes = {
    categorias: PropTypes.array,
    cantProductos: PropTypes.number,
    prodMostrados: PropTypes.number,
    soloNuevos: PropTypes.bool,
    setSoloNuevos: PropTypes.func,
    categoriaSeleccionada: PropTypes.string,
    setCategoriaSeleccionada: PropTypes.func,
    setMinPrecio: PropTypes.func,
    setMaxPrecio: PropTypes.func,
    setOrdenamiento: PropTypes.func
};