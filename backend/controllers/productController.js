const Product = require("../models/productModel");

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    if (!products) {
      return res.status(404).json({
        message: "products not found",
      });
    }
    res.status(200).json({
      products,
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.getOneProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        message: "product not found",
      });
    }

    res.json({
      product,
    });
  } catch (error) {
    console.log(error.message);
  }
};
