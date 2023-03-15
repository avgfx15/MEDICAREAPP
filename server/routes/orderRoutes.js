const express = require("express");
const {
  orderroutesTest,
  orderByUser,
  getOrderByOrderId,
  getAllOrders,
  updatePaymentStatus,
  updateDeliveryStatus,
  deleteOrderByOrderId,
} = require("../controllers/orderController");
const { authenticate } = require("../middlewares/authenticate");
const orderRoutes = express.Router();

orderRoutes.get("/order", authenticate, orderroutesTest);
orderRoutes.post("/neworder", authenticate, orderByUser);
orderRoutes.get("/neworder", authenticate, getAllOrders);
orderRoutes.get("/neworder/:id", authenticate, getOrderByOrderId);
orderRoutes.put("/orderdelivery/:id", authenticate, updateDeliveryStatus);
orderRoutes.put("/orderpayment/:id", authenticate, updatePaymentStatus);
orderRoutes.delete("/order/:id", authenticate, deleteOrderByOrderId);

module.exports = orderRoutes;
