const express = require("express");
const {
  orderroutesTest,
  getOrderByOrderId,
  getAllOrders,
  updatePaymentStatus,
  updateDeliveryStatus,
  deleteOrderByOrderId,
  getTotalSaleValue,
  // getTotalOrdersCount,
  newOrderByUser,
  checkOutSessionForPayment,
} = require("../controllers/orderController");
const { authenticate } = require("../middlewares/authenticate");
const orderRoutes = express.Router();

orderRoutes.get("/order", authenticate, orderroutesTest);
orderRoutes.post("/neworder", authenticate, newOrderByUser);
orderRoutes.post("/checkoutpayment", authenticate, checkOutSessionForPayment);
orderRoutes.get("/allorders", authenticate, getAllOrders);
orderRoutes.get("/order/:id", authenticate, getOrderByOrderId);
orderRoutes.put("/orderdelivery/:id", authenticate, updateDeliveryStatus);
orderRoutes.put("/orderpayment/:id", authenticate, updatePaymentStatus);
orderRoutes.delete("/order/:id", authenticate, deleteOrderByOrderId);
orderRoutes.get("/order/totalsalevalue", authenticate, getTotalSaleValue);
// orderRoutes.get("/order/totalordercount", authenticate, getTotalOrdersCount);

module.exports = orderRoutes;
