const express = require("express");
const multer = require("multer");
const {
  testController,
  addNewProductController,
  getAllProducts,
  getProductsByUserLoggedIn,
  getProductByProductId,
  deleteProductByProductId,
} = require("../controllers/sellerController");
const sellerRoute = express.Router();
const { authenticate } = require("../middlewares/authenticate");
const upload = require("../middlewares/multer");
// const upload = multer({ dest: "uploads/" });

/// Test Seller Controller
sellerRoute.get("/test", testController);

/// Add New Product Seller Controller
sellerRoute.post(
  "/addnewproduct",
  authenticate,
  // upload.single("productImage"),
  addNewProductController
);

/// Get All Products Seller Controller
sellerRoute.get("/getallproducts", getAllProducts);

/// Get Products Added By Seller Controller
sellerRoute.get("/getsellerproducts", authenticate, getProductsByUserLoggedIn);

/// Get Product By Id Seller Controller
sellerRoute.get("/getproductbyproductid/:id", getProductByProductId);

/// Delete Product By Seller By Product Id seller Controller

sellerRoute.delete(
  "/deleteproductbyproductid/:id",
  authenticate,
  deleteProductByProductId
);

module.exports = sellerRoute;
