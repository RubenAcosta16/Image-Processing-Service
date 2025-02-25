import dotenv from "dotenv";

// Carga las variables de entorno
dotenv.config();

export const {
  PORT = 3000,
  MONGODB_URI,
  SALTROUNDS,
  SECRET_JWT_KEY,
  FRONTEND_URL = "http://localhost:5173",
  TU_CLOUD_NAME,
  TU_API_KEY,
  TU_API_SECRET,
} = process.env;
