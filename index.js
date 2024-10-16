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

app.post("/api/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

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
