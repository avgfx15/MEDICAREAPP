const express = require("express");
const { test } = require("../controllers/categoryController");
const { authenticate } = require("../middlewares/authenticate");
const categoryRoute = express.Router();

categoryRoute.post("/test", authenticate, test);

module.exports = categoryRoute;
