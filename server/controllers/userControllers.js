const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

//` User Route Test route
exports.test = async (req, res) => {
  res.json({ message: "User Routes Working" });
};

//` User Sign up route
exports.signup = async (req, res) => {
  try {
    // Destructure data
    const { name, email, mobile, password } = req.body;

    // check user is exist or not by email

    const userExist = await User.findOne({ email });

    if (userExist) {
      return res
        .status(400)
        .json({ errorMessage: "User Already Exist", resStatus: false });
    }

    // hash password with bcryptjs
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
      .json({ successMessage: "User Saved", resStatus: true, user });
  } catch (error) {
    return res
      .status(500)
      .json({ errorMessage: "Server error", resStatus: false, error });
  }
};
