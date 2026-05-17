const Product = require("../model/Product");

// create product
const createProduct = async (req, res) => {
  try {
    const product = await Product.create({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      image: req.body.image,
      category: req.body.category,
      user: req.user.id,
    });

    res.json({
      success: true,
      product,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
};

// get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.json({
      success: true,
      products,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
};
// get logged in user's products
const getMyProducts = async (req, res) => {
  try {

    const products = await Product.find({
      user: req.user.id,
    });

    res.json({
      success: true,
      products,
    });

  } catch (error) {

    console.error(error.message);

    res.status(500).send("Internal Server Error");
  }
};
module.exports = {
  createProduct,
  getProducts,
  getMyProducts,
};