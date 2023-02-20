const express = require("express");
const { get } = require("mongoose");
const { testadmin } = require("../controllers/adminController");
const adminRoute = express.Router();

adminRoute.get("/test", testadmin);

module.exports = adminRoute;


