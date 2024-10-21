### **Node.js Basics**:

- **Node.js** is a runtime environment that lets you run JavaScript on the server.
- It's built on **Chrome's V8 JavaScript engine** and allows you to handle things like server requests, file system operations, and more.
- It's non-blocking and event-driven, meaning it can handle multiple tasks simultaneously without waiting for one to finish before moving on to the next.

---

### **Express.js Basics**:

- **Express.js** is a **web application framework** built on top of Node.js that simplifies server-side logic.
- It helps manage routing (URLs and HTTP methods), middleware (processing requests), and responses.
- In a MERN stack, Express is often used to create APIs that communicate with MongoDB and the frontend React app.

---

### **Step 1: Initialize a Node.js project**

1. First, navigate to your project folder and initialize it:

```bash
npm init -y
```

This will create a `package.json` file.

---

### **Step 2: Install Express**

2. Install **Express** via npm:

```bash
npm install express
```

**package.json: customized start**:

```json
{
  "name": "expressserver",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "nodemon index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "cors": "^2.8.5",
    "express": "^4.21.0",
    "nodemon": "^3.1.7"
  }
}
```

### **Step 3: Create the Server**

3. Now, let's create a basic Express server in `index.js`:

```javascript
// Import express
const express = require("express");
const app = express();

// Define a port
const port = 3000;

// Create a basic route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
```

4. Run the server:

```bash
node index.js
```

Navigate to `http://localhost:3000` in your browser, and you should see the message: **Hello World!**

---

🥷 **Hacker Tip**: Want to make your development process smoother? Install **nodemon** for auto-reloading your server during development:

```bash
npm install -g nodemon
```

Run your app with:

```bash
nodemon index.js
```

If nodemon create problem

```bash
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

- Installing the CORS (Cross-Origin Resource Sharing) middleware in Node.js application

```bash
npm i cors
```

---

### **Creating route and Loading data form json file and send in response**

```javascript
const news = require("./data/news.json");
const categories = require("./data/categories.json");

app.use(cors());

// Create route
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Create route
app.get("/about", (req, res) => {
  res.send("About Us Page");
});

// Create route
app.get("/news", (req, res) => {
  res.send(news);
});

// Create route
app.get("/categories", (req, res) => {
  res.send(categories);
});
```

### **Module**

- Every file in node is module
- Variable or Function defined in that file are scope that file. In OOP term it's private to that module.
- To use outside the module export it explicitly and make it public.

```js
// logger.js
function log(message) {
  console.log(message);
}

module.exports = log; // making public from this module
console.log(module); // We can check current export
```

```js
// app.js | require function is not avaliable in client js
const log = require("./logger"); // local file module - ./ or ../
const express = require("express"); // For bulit in or libarary module

log("Subroto Ok");
```

**Form OS module which is built in module. We get info about Operating system**

```js
const os = require("os");

const totalmem = os.totalmem();
const freemem = os.freemem();

console.log(totalmem);
console.log(freemem);
```

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

### **CommonJS -> ES6**

- Replace require with import.
- Replace module.exports with export.
- Add .js extensions when importing local files.

```js
const express = require("express");
import express from "express";
```

```js
module.exports = {
  createProducts,
  getAllProducts,
  getProductById,
  deleteProductById,
  updateProductById,
};

// Export all functions
export {
  createProducts,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
};
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
