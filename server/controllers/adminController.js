const User = require("../models/userModel");
const ProductModel = require("../models/productModel");

exports.testadmin = async (req, res) => {
  console.log("Admin Testing route is working");
};

//*? Get All Users data and check role
exports.getAllUsers = async (req, res) => {
  try {
    const userSignIn = req.user;
    if (!userSignIn) {
      return res.json({
        errorMessage: "User not Authorized",
        resStatus: false,
      });
    }

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
  const userSignIn = req.user.role;
  if (!userSignIn) {
    return res.json({ errorMessage: "User not Authorized", resStatus: false });
  }

  try {
    const getAllRole = await User.find().select("role").limit(3);

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
  if (!userSignIn) {
    return res.json({ errorMessage: "User not Authorized", resStatus: false });
  }

  try {
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
  const userSignIn = req.user.id;
  if (!userSignIn) {
    return res.json({ errorMessage: "User not Authorized", resStatus: false });
  }
  const userId = req.params.id;
  try {
    const userData = await User.findById(userId);
    if (!userData) {
      return res.json({ errorMessage: "User not found", resStatus: false });
    }
    return res.json({
      successMessage: "User found",
      resStatus: true,
      User: userData,
    });
  } catch (error) {
    return res.status(500).json({ errorMessage: "Server error", error });
  }
};

//? Update User Data

exports.updateUserByUserId = async (req, res) => {
  const userSignIn = req.user.id;
  if (!userSignIn) {
    return res.json({ errorMessage: "User not Authorized", resStatus: false });
  }
  const userId = req.params.id;
  try {
    const checkUser = await User.findById(userId);

    if (!checkUser) {
      return res.json({ errorMessage: "User not found", resStatus: false });
    }
    const { name, email, mobile, role } = req.body;

    const userData = await User.findByIdAndUpdate(
      userId,
      { $set: { name: name, email: email, mobile: mobile, role: role } },
      {
        new: true,
      }
    );

    return res.json({
      successMessage: "User updated",
      resStatus: true,
      User: userData,
    });
  } catch (error) {
    return res.status(500).json({ errorMessage: "Server error", error });
  }
};

//-Delete User Bu UserIdAjay gandhi
exports.deleteUserByUserId = async (req, res) => {
  const user = req.user;

  if (!user) {
    return res.json({ errorMessage: "User not Authorized", resStatus: false });
  }
  const userId = req.params.id;

  if (user.role != "admin") {
    return res.json({ errorMessage: "User not Authorized", resStatus: false });
  }
  try {
    const userExist = await User.findById(userId);
    if (!userExist) {
      return res.json({ errorMessage: "User not found", resStatus: false });
    }
    await User.findByIdAndDelete(userId);
    return res.json({
      successMessage: "User Deleted Successfully",
      resStatus: true,
    });
  } catch (error) {
    return res.status(500).json({ errorMessage: "Server error", error });
  }
};

// ? Update Product By Admin User
exports.updateProductByAdmin = async (req, res) => {
  const loggedInUser = req.user;

  if (!loggedInUser) {
    return res.json({ errorMessage: "User not Authorized", resStatus: false });
  }
  if (loggedInUser.role != "admin") {
    return res.json({ errorMessage: "User not Authorized", resStatus: false });
  }
  const productId = req.params.id;

  const product = await ProductModel.findById(productId);
  if (!product) {
    return res.json({ errorMessage: "Product not found", resStatus: false });
  }
  const {
    productImage,
    productName,
    productDescription,
    productCategory,
    productPrice,
    productQty,
  } = req.body;
  const updateProduct = await ProductModel.findByIdAndUpdate(
    productId,
    {
      $set: {
        productImage: productImage,
        productName: productName,
        productDescription: productDescription,
        productCategory: productCategory,
        productPrice: productPrice,
        productQty: productQty,
      },
    },
    { new: true }
  );
  return res.json({
    successMessage: "Product Updated Successfully",
    resStatus: true,
    Product: updateProduct,
  });
};
