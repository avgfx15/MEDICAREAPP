const express = require("express");

const {
  testadmin,
  getAllUsers,
  getAllSellersData,
  getUserByUserId,
  getAllRole,
} = require("../controllers/adminController");

const { authenticate } = require("../middlewares/authenticate");
const adminRoute = express.Router();

adminRoute.get("/test", testadmin);
adminRoute.get("/allusers", authenticate, getAllUsers);
adminRoute.get("/getuser/:id", authenticate, getUserByUserId);
adminRoute.get("/allsellers", authenticate, getAllSellersData);
adminRoute.get("/getallroles", authenticate, getAllRole);

module.exports = adminRoute;
