const express = require("express");
const {
  orderroutesTest,
  getOrderByOrderId,
  getAllOrders,
  updatePaymentStatus,
  updateDeliveryStatus,
  deleteOrderByOrderId,
  getTotalSaleValue,
  getTotalOrdersCount,
  newOrderByUser,
  checkOutSessionForPayment,
  getAllOrderPlacedByUser,
  allOrdersCount,
  getCountAllOrdersPlacedByUser,
  getAllOrdersCount,
  sellerProductsFromOrder,
} = require("../controllers/orderController");
const { authenticate } = require("../middlewares/authenticate");
const orderRoutes = express.Router();

orderRoutes.get("/order", authenticate, orderroutesTest);
orderRoutes.post("/neworder", authenticate, newOrderByUser);
orderRoutes.post("/checkoutpayment", authenticate, checkOutSessionForPayment);
orderRoutes.get("/allorders", authenticate, getAllOrders);
orderRoutes.get("/ordersbyuser", authenticate, getAllOrderPlacedByUser);
orderRoutes.get("/order/:id", authenticate, getOrderByOrderId);
orderRoutes.put("/orderdelivery/:id", authenticate, updateDeliveryStatus);
orderRoutes.put("/orderpayment/:id", authenticate, updatePaymentStatus);
orderRoutes.delete(
  "/order/deleteorder/:id",
  authenticate,
  deleteOrderByOrderId
);
orderRoutes.get("/order/totalsalevalue", authenticate, getTotalSaleValue);
orderRoutes.get("/getallordercount", authenticate, getAllOrdersCount);

orderRoutes.get(
  "/getcountofallorders",
  authenticate,
  getCountAllOrdersPlacedByUser
);

orderRoutes.get("/orderofsellerproduct", authenticate, sellerProductsFromOrder);
module.exports = orderRoutes;
