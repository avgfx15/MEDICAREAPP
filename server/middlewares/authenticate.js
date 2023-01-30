const jwt = require("jsonwebtoken");
const config = require("../config/configSecret");

exports.authenticate = (req, res, next) => {
  const token = req.cookies;
  console.log(token);
};
