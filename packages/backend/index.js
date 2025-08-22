import "dotenv/config";
import express from "express";
import cors from "cors";
import healthCheckRoutes from "./routes/healthCheckRoutes"

const app = express();

const port = process.env.SERVER_PORT

app.use(express.json());

app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS
      ? process.env.ALLOWED_ORIGINS.split(",").map((o) => o.trim())
      : true,
  }),
);

app.use('/health', healthCheckRoutes)

app.listen(port, () => {
  console.log(`Backend escuchando en puerto ${process.env.SERVER_PORT}`);
});
