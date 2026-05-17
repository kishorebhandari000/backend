const express = require("express");
const router = express.Router();

const fetchUser = require("../middleware/fetchUser");

const {
  createProduct,
  getProducts,
} = require("../controllers/productController");

// public route
router.get("/getproducts", getProducts);

// protected route
router.post("/createproduct", fetchUser, createProduct);

module.exports = router;