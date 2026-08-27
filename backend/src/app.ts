import express from "express";
import cors from "cors";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { productRoutes } from "./routes/products.routes.js";
import { userRoutes } from "./routes/user.routes.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";

const __dirname = dirname(fileURLToPath(import.meta.url))

const app = express();

app.use(cors({
    origin: process.env['FRONTEND_URL'] ?? "http://localhost:5173",
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use('/images', express.static(join(__dirname, 'public/images')));

app.use('/products', productRoutes);
app.use('/users', userRoutes);

app.use(errorMiddleware);


export default app;
