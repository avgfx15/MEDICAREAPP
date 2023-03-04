const express = require("express");

const {
  testadmin,
  getAllUsers,
  getAllSellersData,
  getUserByUserId,
  getAllRole,
  updateUserByUserId,
  deleteUserByUserId,
  updateProductByAdmin,
} = require("../controllers/adminController");

const { authenticate } = require("../middlewares/authenticate");
const adminRoute = express.Router();

adminRoute.get("/test", testadmin);
adminRoute.get("/allusers", authenticate, getAllUsers);
adminRoute.get("/getuser/:id", authenticate, getUserByUserId);
adminRoute.put("/updateuser/:id", authenticate, updateUserByUserId);
adminRoute.delete("/deleteuser/:id", authenticate, deleteUserByUserId);
adminRoute.get("/allsellers", authenticate, getAllSellersData);
adminRoute.get("/getallroles", authenticate, getAllRole);
adminRoute.put('/updateproductbyadmin/:id', authenticate, updateProductByAdmin)

module.exports = adminRoute;
