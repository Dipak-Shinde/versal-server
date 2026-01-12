import Product from "../models/Product.model.js";


export const createProduct = async (req, res) => {
  const { name, price, category } = req.body;

  const product = await Product.create({
    name,
    price,
    category, // category _id
    image: req.file?.filename
  });

  res.status(201).json(product);
};

// Add new product
export const addProduct = async (req, res) => {
  try {
    const { name, price, category } = req.body;
    const image = req.file ? req.file.filename : null;

    const product = new Product({ name, price, category, image });
    await product.save();

    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get all products

export const getProducts = async (req, res) => {
  const products = await Product.find().populate("category", "name");
  res.json(products);
};

export const getCategories = async (req, res) => {
  const categories = await Product.distinct("category");
  res.json(categories);
};

// controllers/productController.js
export const likeProduct = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ message: "User ID required" });

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const alreadyLiked = product.likedBy.some((id) => id.toString() === userId);

    if (alreadyLiked) {
      product.likedBy = product.likedBy.filter((id) => id.toString() !== userId);
      product.likes = Math.max(product.likes - 1, 0);
    } else {
      product.likedBy.push(userId);
      product.likes += 1;
    }

    await product.save();

    res.json({
      likes: product.likes,
      likedByUser: !alreadyLiked,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};






export const updateProduct = async (req, res) => {
  try {
    const { name, price, category } = req.body;

    const updateData = { name, price, category };

    if (req.file) {
      updateData.image = req.file.filename;
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Update failed" });
  }
};


// Delete product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
