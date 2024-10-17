const Product = require("../models/product.model.js");

// Controller has all business logic and it use model to talk with db
const createProducts = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    // const product = await Product.findById(id, "price");
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

const updateProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedProduct)
      return res.status(404).json({ message: "Product not found" });

    return res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createProducts,
  getAllProducts,
  getProductById,
  deleteProductById,
  updateProductById,
};
