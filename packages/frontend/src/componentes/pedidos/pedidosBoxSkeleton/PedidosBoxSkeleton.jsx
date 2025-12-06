import React from "react";
import {
  Card,
  CardContent,
  Box,
  Skeleton,
  Divider,
  Stack,
} from "@mui/material";
import "./PedidosBoxSkeleton.css";

export default function PedidosBoxSkeleton() {
  return (
    <Card className="pedido-card" elevation={0}>
      <Box className="pedido-card-header">
        <Box>
          <Skeleton variant="text" width={140} height={28} />
          <Skeleton variant="text" width={180} height={20} />
        </Box>
        <Skeleton variant="rounded" width={100} height={32} />
      </Box>

      <CardContent>
        <Box
          className="pedido-item"
          sx={{ display: "flex", gap: 2, alignItems: "center", mb: 1 }}
        >
          <Skeleton variant="rounded" width={56} height={56} />{" "}
          <Box sx={{ flex: 1 }}>
            <Skeleton variant="text" width="60%" height={20} />
            <Skeleton variant="text" width="40%" height={16} />
          </Box>
        </Box>

        <Divider className="pedido-divider" sx={{ my: 2 }} />

        <Box
          className="pedido-total"
          sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
        >
          <Skeleton variant="text" width={120} height={20} />
          <Skeleton variant="text" width={100} height={24} />
        </Box>

        <Stack direction="row" justifyContent="end" spacing={2}>
          <Skeleton variant="rounded" width={120} height={36} />
          <Skeleton variant="rounded" width={140} height={36} />
        </Stack>
      </CardContent>
    </Card>
  );
}
