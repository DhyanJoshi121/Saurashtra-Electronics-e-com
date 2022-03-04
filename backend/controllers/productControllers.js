import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

// @desc: Fetch all products
// @route: GET /api/products
//@access: Public

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// @desc: Fetch single products
// @route: GET /api/products/:id
//@access: Public

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    // res.status(404).json({ message: "Product not found" });
    // this is before we created errormiddleware now that we have errormiddleware we don't need to define .json and massage cause bydefault our error will be displayed in massage cause of middleware
    res.status(404); //by default it will be 500
    throw new Error("Product not found");
  }
});

// @desc: Delete a product
// @route: DELETE /api/products/:id
//@access: Private/Admin

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: "Product Removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export { getProductById, getProducts, deleteProduct };
