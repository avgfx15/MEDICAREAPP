const express = require("express");
const userRoute = express.Router();
const {
  test,
  signup,
  signin,
  getAllUsers,
  userProfile,
} = require("../controllers/userControllers");
const { authenticate } = require("../middlewares/authenticate");
const {
  signupvalidator,
  signinvalidator,
  validatorResult,
} = require("../middlewares/validators");

//` User Test route
userRoute.get("/test", test);

//` New User Signup route

userRoute.post("/signup", signupvalidator, validatorResult, signup);
userRoute.post("/signin", signinvalidator, validatorResult, signin);
userRoute.post("/profile", authenticate, userProfile);

module.exports = userRoute;
