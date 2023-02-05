const jwt = require("jsonwebtoken");
const config = require("../config/configSecret");

exports.authenticate = (req, res, next) => {
  const token = req.headers.cookies;

  if (!token) {
    return res
      .status(201)
      .json({ errorMessage: "No token available", resStatus: false });
  }
  try {
    const decode = jwt.decode(token);

    req.user = decode.user;

    next();
  } catch (error) {
    return res.status(500).json({
      errorMessage: "Jwt decode error",
      resStatus: false,
      error: error,
    });
  }
};
