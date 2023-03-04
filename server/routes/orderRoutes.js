const express = require("express");
const {
  orderroutesTest,
  orderByUser,
} = require("../controllers/orderController");
const { authenticate } = require("../middlewares/authenticate");
const orderRoutes = express.Router();

orderRoutes.get("/order", orderroutesTest);
orderRoutes.post("/neworder/:userId/:productId", authenticate, orderByUser);

module.exports = orderRoutes;
