const express = require("express");
const multer = require("multer");
const {
  testController,
  addNewProductController,
} = require("../controllers/sellerController");
const sellerRoute = express.Router();
const { authenticate } = require("../middlewares/authenticate");
// const upload = require("../middlewares/multer");

sellerRoute.get("/test", testController);
sellerRoute.post(
  "/addnewproduct",
  authenticate,
  // upload.single("productImage"),
  addNewProductController
);
module.exports = sellerRoute;
