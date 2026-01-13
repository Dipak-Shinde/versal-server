import express from 'express';
import dotenv from 'dotenv'
import connectDB from './config/db.js';
import authRoutes from "./routes/auth.routes.js";
import errorHandler from "./middleware/error.middleware.js";
import path from 'path'
import { fileURLToPath } from "url";

import cors from "cors";
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/category.routes.js"
dotenv.config();
connectDB();


const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//middleware 

const allowedOrigins = [
  "http://localhost:5173",
  "https://versal-client-beta.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    // allow localhost
    if (origin.startsWith("http://localhost")) return callback(null, true);

    // allow ALL vercel deployments
    if (origin.endsWith(".vercel.app")) return callback(null, true);

    callback(new Error("Not allowed by CORS"));
  },
  credentials: true
}));

app.use("/uploads", express.static("uploads"));


app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/products", productRoutes);

app.use("/api/categories", categoryRoutes);


app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
