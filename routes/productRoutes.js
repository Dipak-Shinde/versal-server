import express from "express";
import { addProduct, getProducts, deleteProduct,updateProduct,getCategories,likeProduct } from "../controllers/productController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/", upload.single("image"), addProduct);
router.get("/all", getProducts);
router.get("/categories", getCategories);
router.delete("/:id", deleteProduct);
router.put("/:id", upload.single("image"), updateProduct);

// Like/unlike a product
router.post("/:id/like", likeProduct);

export default router;
