const express = require("express");
const { test } = require("../controllers/userControllers");
const userRoute = express.Router();

//` User Test route
userRoute.get("/test", test);

module.exports = userRoute;
