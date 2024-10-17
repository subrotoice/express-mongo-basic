const express = require("express");
const mongoose = require("mongoose");
const productRoutes = require("./routes/product.route");

const app = express();

app.use(express.json()); // Json form data body
app.use(express.urlencoded({ extended: false })); // Form encoded data as body

const port = 5000;

app.get("/", (req, res) => {
  res.send("On Home Page");
});

app.get("/about", (req, res) => {
  res.send("On about us page");
});

// Routes
app.use("/api/products", productRoutes);

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
