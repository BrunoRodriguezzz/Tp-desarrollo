import React from "react";
import { Box, Stack, CardMedia } from "@mui/material";
import "./PedidosItemList.css";

export default function PedidosItemList({ items }) {
  return (
    <Stack spacing={2} className="pedido-item-list">
      {items.map((item, index) => {
        const precioTotal = item.precioUnitario * (item.cantidad ?? 1);
        const formattedPrice = precioTotal.toLocaleString("es-AR", {
          style: "currency",
          currency: "ARS",
        });

        return (
          <Box key={index} className="pedido-item">
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              justifyContent="space-between"
            >
              <Stack direction="row" spacing={2} alignItems="center">
                <CardMedia
                  component="img"
                  image={item.producto.fotos[0]}
                  alt={item.producto.titulo}
                  className="pedido-item-img"
                />
                <Box>
                  <p className="pedido-item-titulo">{item.producto.titulo}</p>
                  <p className="pedido-item-detalle">
                    Cantidad: {item.cantidad}
                  </p>
                </Box>
              </Stack>

              <p className="pedido-item-precio">{formattedPrice}</p>
            </Stack>
          </Box>
        );
      })}
    </Stack>
  );
}
