import { Select, MenuItem, InputLabel, FormControl, Chip, Box, OutlinedInput } from "@mui/material";
import categoriesMock from "../../../mockData/Categories";

export function SelectorCategorias({categorias, setCategorias}) {
  const categoriasDisponibles = categoriesMock;

  const handleChange = (event) => {
    const { value } = event.target;
    setCategorias(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <FormControl fullWidth margin="normal" size="small">
          <InputLabel>Categorías</InputLabel>
          <Select
            multiple
            value={categorias}
            onChange={handleChange}
            input={<OutlinedInput label="Categorías" />}
            renderValue={(selected) => (
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 0.5,
                  alignItems: "center",
                }}
              >
                {selected.map((value) => (
                  <Chip
                    key={value}
                    label={value}
                  />
                ))}
              </Box>
            )}
            MenuProps={{
              PaperProps: {
                style: { maxHeight: 220 },
              },
            }}
          >
            {categoriasDisponibles.map((cat) => (
              <MenuItem key={cat.name} value={cat.name}>
                {cat.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
  )
}
