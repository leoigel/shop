const express = require("express");
const router = express.Router();
const {auth,admin} = require("../middlewares/auth");
const orderController = require("../controllers/orderController");


router.post("/", auth, orderController.addOrderItems);
router.get("/", auth,admin, orderController.getOrders);
router.get("/myorders", auth, orderController.getMyOrders);
router.get("/:id", auth, orderController.getOrderById);
router.put("/:id/pay", auth, orderController.updateOrderToPaid);
router.put("/:id/deliver", auth,admin, orderController.updateOrderToDelivered);



module.exports = router;
