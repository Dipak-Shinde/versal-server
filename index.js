import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/category.routes.js";
import errorHandler from "./middleware/error.middleware.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// __dirname setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CORS
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://versal-client-beta.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// 🔥 MUST handle preflight
app.options("*", cors());

// Middleware
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);

// Error handler
app.use(errorHandler);

// Start server AFTER MongoDB connects
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});
