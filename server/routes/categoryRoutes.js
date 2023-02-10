const express = require("express");
const {
  addCategory,
  getAllCategories,
} = require("../controllers/categoryController");
const { authenticate } = require("../middlewares/authenticate");
const categoryRoute = express.Router();

categoryRoute.post("/addcategory", authenticate, addCategory);
categoryRoute.get("/allcategories", getAllCategories);

module.exports = categoryRoute;
