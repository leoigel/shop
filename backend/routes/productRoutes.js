const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const {auth,admin} = require("../middlewares/auth");

router.post("/",auth,admin, productController.createProduct);
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getOneProduct);
router.post("/:id/reviews",auth, productController.createProductReview);
router.delete("/:id",auth,admin, productController.deleteProduct);
router.put("/:id",auth,admin, productController.updateProduct);
module.exports = router;
