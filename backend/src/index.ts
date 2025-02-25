import express, { Request, Response, NextFunction } from "express";
import connectDB from "./database/database";
import cookieParser from "cookie-parser";

import { PORT } from "./config";
import sessionMiddleware from "./middlewares/sessionMiddleware";
import corsMiddleware from "./middlewares/corsMiddleware";

import v1UserRoutes from "./v1/routes/userRoutes";
import v1ImagesRoutes from "./v1/routes/imagesRoutes";
import errorMiddleware from "./middlewares/errorMiddleware";

const app = express();

connectDB();

app.use(express.json());
app.use(cookieParser());

app.use(corsMiddleware);

declare module "express" {
  interface Request {
    session?: { user: null | { id: string; username: string } };
  }
}

app.use(sessionMiddleware);

app.use("/api/v1/user", v1UserRoutes);
app.use("/api/v1/image", v1ImagesRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  errorMiddleware(err, req, res, next);
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

export default app;
