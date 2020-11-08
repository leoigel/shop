const { json } = require("express");
const Product = require("../models/productModel");

exports.getAllProducts = async (req, res) => {
  try {
    const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}
    const products = await Product.find({ ...keyword });
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
}
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        message: "product not found",
      });
    }
    await product.remove()

    res.json({
      message:'product was removed',
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.createProduct = (async (req,res) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  })

  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

exports.updateProduct = (async(req,res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
  } = req.body

  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({
       message:'Product not found'
     })
   } 
      product.name = name
      product.price = price
      product.description = description
      product.image = image
      product.brand = brand
      product.category = category
      product.countInStock = countInStock

      const updatedProduct = await product.save()
      res.json(updatedProduct)
})

exports.createProductReview = (async(req,res) => {
  try{
    const { rating, comment } = req.body

    const product = await Product.findById(req.params.id)
    console.log(product)
    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      )
  
      if (alreadyReviewed) {
        return res.status(400).json({message:'Product already reviewed'})
        
      }
  
      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      }
  
      product.reviews.push(review)
  
      product.numReviews = product.reviews.length
  
      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length
  
      await product.save()
      res.status(201).json({ message: 'Review added' })
    } else {
      return res.status(404).json({message:'Product not found'})
    }
  }catch(error) {
    res.status(500).json({
      message: error.message,
    });
  }
})