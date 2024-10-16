### **Mongo DB install**

```bash
npm i mongodb
npm i mongoose
```

NB: In mongodb collection is database and inside collection there are several tables

### **Insert data in to MongoDB Atlas using mongoose**

timestamps: true. automatically adds createdAt and updatedAt fields to records<br>
const Product = mongoose.model("Product", ProductSchema)<br>
"Product": Model Name. Mongoose will automatically pluralize this name to determine the name of the MongoDB collection named 'products' (small letter and plural) table name

```js
// models/product.model.js
const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter product name"],
    },
    quantity: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    image: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Productok", ProductSchema);

module.exports = Product;
```

app.use(express.json()): Parses incoming requests with JSON payloads. It converts the JSON data in the request body into a JavaScript object

```js
// index.js
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
```

### **.**

```js

```

### **.**

```js

```

### **.**

```js

```

### **.**

```js

```
