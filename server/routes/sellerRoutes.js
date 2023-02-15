const express = require("express");
const multer = require("multer");
const {
  testController,
  addNewProductController,
  getAllProducts,
  getProductsByUserLoggedIn,
} = require("../controllers/sellerController");
const sellerRoute = express.Router();
const { authenticate } = require("../middlewares/authenticate");
const upload = require("../middlewares/multer");
// const upload = multer({ dest: "uploads/" });

sellerRoute.get("/test", testController);
sellerRoute.post(
  "/addnewproduct",
  authenticate,
  upload.single("productImage"),
  addNewProductController
);
sellerRoute.get("/getallproducts", getAllProducts);
sellerRoute.get(
  "/getuserproducts/:id",
  authenticate,
  getProductsByUserLoggedIn
);
module.exports = sellerRoute;
