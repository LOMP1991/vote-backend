import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import { runMigrations } from "./db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());

//conectar rutas
import  authRoutes from "./routes/auth.js";
app.use("/auth", authRoutes);

import userRoutes from "./routes/userRoutes.js";
app.use("/api/users", userRoutes);

import electionRoutes from "./routes/electionRoutes.js";
app.use("/api/elections", electionRoutes);

// Ejecutar migraciones de la base de datos
runMigrations();

// Ruta básica de prueba
app.get("/", (req, res) => {
  res.json({ message: "Backend de Sistema de Votación Estudiantil activo" });
});

// Arrancar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
