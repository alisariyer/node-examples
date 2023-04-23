const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const { ObjectId } = require("mongoose").Types;
const methodOverride = require("method-override");
const AppError = require("./AppError");

const Product = require("./models/product");

const main = async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/farmStand2");
};

main()
  .then((msg) => console.log("Connection open"))
  .catch((err) => console.log("DB Error: ", err));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

const categories = ["fruit", "vegetable", "dairy"];

app.get("/", (req, res) => {
  res.send("Homepage");
});

function handleAsyncErrors(fn) {
  return function (req, res, next) {
    fn(req, res, next).catch((e) => next(e));
  };
}

app.get(
  "/products",
  handleAsyncErrors(async (req, res, next) => {
    const { category } = req.query;
    let products;
    if (category) {
      products = await Product.find({ category: category });
      res.render("products/index", { products, category });
    } else {
      products = await Product.find({});
      res.render("products/index", { products, category: "All" });
    }
  })
);

app.get("/products/new", (req, res) => {
  // throw new AppError('Not allowed', 401);
  res.render("products/new", { categories });
});

app.post(
  "/products",
  handleAsyncErrors(async (req, res, next) => {
    const { name, price, category } = req.body;
    const newProduct = new Product({
      name: name,
      price: price,
      category: category,
    });
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`);
  })
);

app.get("/products/:id", async (req, res, next) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) return next(new AppError("Id not exist!", 400));
  const product = await Product.findById(id);
  if (!product) return next(new AppError("Product not found", 404));
  res.render("products/detail", { product });
});

app.get(
  "/products/:id/edit",
  handleAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    let product;
    if (!ObjectId.isValid(id)) throw new AppError("Id not exist!", 400);
    product = await Product.findById(id);
    if (!product) throw new AppError("Product not found", 404);
    res.render("products/edit", { product, categories });
  })
);

app.put(
  "/products/:id",
  handleAsyncErrors(async (req, res, next) => {
    const { id } = req.params;

    const product = await Product.findByIdAndUpdate(id, req.body, {
      runValidators: true,
      new: true,
    });
    res.redirect(`/products/${product._id}`);
  })
);

app.delete(
  "/products/:id",
  handleAsyncErrors(async (req, res, next) => {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);
    res.redirect("/products");
  })
);

const handleValidationErr = err => {
    console.dir(err);
    return err;
}

app.use((err, req, res, next) => {
    console.log(err.name);
    if (err.name === 'ValidationError') err = handleValidationErr(err);
    next(err);
})

app.use((err, req, res, next) => {
  const { status = 500, message = "Something went wrong!" } = err;
  res.status(status).send(message);
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
