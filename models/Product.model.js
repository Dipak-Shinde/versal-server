// models/Product.model.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true
  },
likes: { type: Number, default: 0 },
likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  image: { type: String }
}, { timestamps: true });

export default mongoose.model("Product", productSchema);
