const ProductModel = require("../models/ProductModel");

/// Product Model Testing route
exports.testController = async (req, res) => {
  console.log("Seller Test Route");
};

/// Add New Product in DB

exports.addNewProductController = async (req, res) => {
  const signInUser = req.user.id;
  const productImage = req.file.filename;
  const path = "../uploads/";
  const {
    productName,
    productDescription,
    productCategory,
    productPrice,
    productQty,
  } = req.body;

  try {
    const checkProduct = await ProductModel.findOne({
      productName: productName,
    });

    if (checkProduct) {
      return res.json({
        errorMessage: "Product already Exist",
        resStatus: false,
      });
    } else {
      const newProduct = new ProductModel({
        productImage: path + productImage,
        productName: productName,
        productDescription: productDescription,
        productCategory: productCategory,
        productPrice: productPrice,
        productQty: productQty,
        sellerDetails: signInUser,
      });

      await newProduct.save();

      return res.json({
        successMessage: "Product saved successfully",
        resStatus: true,
        product: newProduct,
      });
    }
  } catch (error) {
    return res.status(500).json({ errorMessage: "Server error", error: error });
  }
};

/// Get All Products from DB

exports.getAllProducts = async (req, res) => {
  try {
    const allProducts = await ProductModel.find();
    if (!allProducts) {
      return res.json({ errorMessage: "Product not found", resStatus: false });
    }
    return res.json({
      successMessage: "All Products from DB",
      resStatus: true,
      Products: allProducts,
    });
  } catch (error) {
    return res.status(500).json({ errorMessage: "Server error", error: error });
  }
};

exports.getProductsByProductId = async (req, res) => {
  const user = req.user.id;
  console.log(user);
  const productId = req.params.id;
  try {
    const product = await ProductModel.findById(productId);

    if (user != product.sellerDetails.toString()) {
      return res.json({
        errorMessage: "You are not authorized",
        resStatus: false,
      });
    }
    return res.json({
      successMessage: "Product Delete Successfully",
      resStatus: true,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ errorMessage: "Server error", resStatus: false, error });
  }
};

exports.getProductsByUserLoggedIn = async (req, res) => {};
