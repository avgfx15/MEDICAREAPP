const User = require("../models/userModel");

exports.testadmin = async (req, res) => {
  console.log("2");
  const userId = req.params.id;
  console.log(userId);
  const user = await User.findOne({ _id: userId });
  console.log(user);
};

//*? Get All Users data and check role
exports.getAllUsers = async (req, res) => {
  try {
    const userSignIn = req.user;

    if (userSignIn.role === "user") {
      return res.json({
        errorMessage: "You are not authorized.",
        resStatus: false,
      });
    } else {
      const allUsers = await User.find();
      return res.json({
        successMessage: "All registered users",
        resStatus: true,
        AllUsers: allUsers,
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ errorMessage: "Server error", resStatus: false, error });
  }
};

// ? Get Only role From Users

exports.getAllRole = async (req, res) => {
  console.log("Get Rolls Trigger");
  const userSignIn = req.user.role;
  try {
    const getAllRole = await User.find().select("role").limit(3);
    console.log(getAllRole);
    if (!getAllRole) {
      return res.json({
        errorMessage: "Role not assigned",
        resStatus: false,
      });
    }
    return res.json({
      successMessage: "All role",
      resStatus: true,
      AllRoles: getAllRole,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ errorMessage: "Server error", resStatus: false });
  }
};

//? Get All Sellers Data and Check Role

exports.getAllSellersData = async (req, res) => {
  const userSignIn = req.user.role;

  try {
    if (userSignIn != "admin") {
      return res.json({
        errorMessage: "Seller Data not Found",
        resStatus: false,
      });
    }
    const allSellers = await User.find({ role: "seller" });
    return res.json({
      successMessage: "All Sellers Data",
      resStatus: true,
      AllSellers: allSellers,
    });
  } catch (error) {
    return res.status(500).json({
      errorMessage: "Server Error",
      resStatus: false,
      error,
    });
  }
};

// ? Get User By User Id
exports.getUserByUserId = async (req, res) => {
  const authUser = req.user.id;
  const userId = req.params.id;
  try {
    const userData = await User.findById(userId);
    if (!userData) {
      return res.json({ errorMessage: "User not found", resStatus: false });
    }
    const userRoleUpdate = await User.findByIdAndUpdate(
      userId,
      { $set: { role: req.body.role } },
      { new: true }
    );
    console.log(userRoleUpdate);
  } catch (error) {
    return res.status(500).json({ errorMessage: "Server error", error });
  }
};
