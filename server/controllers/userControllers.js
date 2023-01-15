const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/configSecret");
const User = require("../models/userModel");

//` User Route Test route
exports.test = async (req, res) => {
  res.json({ message: "User Routes Working" });
};

//` User Sign up route
exports.signup = async (req, res) => {
  try {
    /// Destructure data
    const { name, email, mobile, password } = req.body;

    /// check user is exist or not by email
    const userExist = await User.findOne({ email });

    if (userExist) {
      return (
        res
          // .status(403)
          .json({ errorMessage: "User Already Exist", resStatus: false })
      );
    }

    /// hash password with bcryptjs
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      mobile,
      password: hashedPassword,
    });
    await user.save();
    res
      .status(201)
      .json({ successMessage: "User Saved", resStatus: true, user: user });
  } catch (error) {
    return res
      .status(500)
      .json({ errorMessage: "Server error", resStatus: false, error });
  }
};

//` User Sign In route
exports.signin = async (req, res) => {
  try {
    /// Destructure data
    const { email, password } = req.body;

    /// check user is exist or not by email
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return (
        res
          // .status(404)
          .json({
            errorMessage: "User Not Found",
            resStatus: false,
          })
      );
    }

    /// Check password is match or not compare password with bcryptjs
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return (
        res
          // .status(404)
          .json({ errorMessage: "Invalid Credentials", resStatus: false })
      );
    }

    /// If password isMatch then Create token with payload user
    const payload = {
      user: {
        _id: user._id,
      },
    };

    await jwt.sign(
      payload,
      config.jwtSecret,
      {
        expiresIn: config.jwtExpire,
      },
      (err, token) => {
        if (err) {
          return res
            .status(500)
            .json({ errorMessage: "No token available", resStatus: false });
        }
        const { _id, name, email, role } = user;
        res.status(200).json({
          token: token,
          user: { _id, name, email, role },
          successMessage: `${user.role}` + ` Sign In Successfully`,
          resStatus: true,
        });
      }
    );
  } catch (error) {
    return res
      .status(500)
      .json({ errorMessage: "Server error", resStatus: false, error });
  }
};
