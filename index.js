const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/product.model");

const app = express();
app.use(express.json());

const port = 5000;

app.get("/", (req, res) => {
  res.send("On Home Page");
});

app.get("/about", (req, res) => {
  res.send("On about us page");
});

// Insert Product
app.post("/api/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

// Fetch all product
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

// Fetch a single product using id
app.get("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

// delete a product using id
app.delete("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const updatedProduct = await Product.findByIdAndDelete(id);

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// mongoose connection
mongoose
  .connect(
    "mongodb+srv://subrotodoict:TyViPjXrhTNL4ATi@backenddb.n3zzu.mongodb.net/?retryWrites=true&w=majority&appName=backendDB"
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
    console.log("Database Connected!");
  })
  .catch(() => console.log("connection failed"));
