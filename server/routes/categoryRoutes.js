const express = require("express");
const { test, addCategory } = require("../controllers/categoryController");
const { authenticate } = require("../middlewares/authenticate");
const categoryRoute = express.Router();

categoryRoute.post("/addcategory", authenticate, addCategory);

module.exports = categoryRoute;
