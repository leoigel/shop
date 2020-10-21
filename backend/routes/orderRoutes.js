const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const orderController = require("../controllers/orderController");

router.post("/", auth, orderController.addOrderItems);
router.get("/:id", auth, orderController.getOrderById);
router.put("/:id/pay", auth, orderController.updateOrderToPaid);
router.get("/myorders", auth, orderController.getMyOrders);

module.exports = router;
