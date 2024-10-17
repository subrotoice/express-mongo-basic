### **Mongo DB install**

```bash
npm i mongodb
npm i mongoose
```

NB: In mongodb collection is database and inside collection there are several tables

### **Insert data in to MongoDB Atlas using mongoose**

- timestamps: true. automatically adds createdAt and updatedAt fields to records<br>
- const Product = mongoose.model("Product", ProductSchema)<br>
- "Product": Model Name. Mongoose will automatically pluralize this name to determine the name of the MongoDB collection named 'products' (small letter and plural) table name

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

- app.use(express.json()): Parses incoming requests with JSON payloads. It converts the JSON data in the request body into a JavaScript object <br>
- app.use(express.urlencoded({ extended: false })); // Form data as body

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

// Create Product
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
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

// Update a product using id
app.delete("/api/products/:id", async (req, res) => {
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
});

// delete a product using id
app.delete("/api/products/:id", async (req, res) => {
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
```

**Here index.js is so populated. Now we break down in different files.**

### **Breakdown into files**

Router making connection between route and controller. Router = Route + Controller fn <br>
Controller has all business logic and it use model to talk with db
![https://prnt.sc/w2CF5rZHXQIm](https://i.postimg.cc/zfVP8b4R/mvc-express.png)
![https://prnt.sc/OAHSdtoN2jTC](https://i.postimg.cc/7LFX4Bgp/REST-API-Server-in-Node-js.jpg)

```js
// index.js
// Routes
app.use("/api/products", productRoutes);
```

```js
// routes/product.route.js
const express = require("express");
const router = express.Router();
const {
  createProducts,
  getAllProducts,
  getProductById,
  deleteProductById,
  updateProductById,
} = require("../controllers/product.controller.js");

// Router making connection between route and controller
router.post("/", createProducts);
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.put("/:id", updateProductById);
router.delete("/:id", deleteProductById);

module.exports = router;
```

**controllers/product.controller.js**

```js
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
```

Link between controller and db <br>
**Product Model**

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

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
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
