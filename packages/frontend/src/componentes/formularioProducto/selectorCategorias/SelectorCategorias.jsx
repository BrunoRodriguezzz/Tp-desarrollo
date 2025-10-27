import { Select, MenuItem, InputLabel, FormControl, Chip, Box } from "@mui/material";
import categoriesMock from "../../../mockData/Categories";

export function SelectorCategorias({ categorias, setCategorias }) {
  const categoriasDisponibles = categoriesMock;

  const handleChange = (event) => {
    const { value } = event.target;
    setCategorias(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <FormControl sx={{width:"50%"}}>
      <InputLabel id="categorias"></InputLabel>
      <Select
        labelId="categorias"
        multiple
        variant="outlined"
        value={categorias}
        onChange={handleChange}
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, width:"80%" }}>
            {selected.map((val) => (
              <Chip key={val} label={val} />
            ))}
          </Box>
        )}
      >
        {categoriasDisponibles.map((categoria) => (
          <MenuItem key={categoria.name} value={categoria.name}>
            {categoria.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
