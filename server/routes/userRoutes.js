const express = require("express");
const userRoute = express.Router();
const { test, signup } = require("../controllers/userControllers");
const {
  signupvalidator,
  validatorResult,
} = require("../middlewares/validators");

//` User Test route
userRoute.get("/test", test);

//` New User Signup route

userRoute.post("/signup", signupvalidator, validatorResult, signup);

module.exports = userRoute;
