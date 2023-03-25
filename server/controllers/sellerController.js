const ProductModel = require("../models/productModel");
const User = require("../models/userModel");

/// Product Model Testing route
exports.testController = async (req, res) => {
  console.log("Seller Test Route");
};

//+ Add New Product in DB

exports.addNewProductController = async (req, res) => {
  const signInUser = req.user.id;

  const {
    productImage,
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
        productImage: productImage,
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

//*? Get All Products from DB

exports.getAllProducts = async (req, res) => {
  try {
    const allProducts = await ProductModel.find().populate(
      "sellerDetails",
      "name"
    );

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

//*? Get Product By ProductId Seller Controller

exports.getProductByProductId = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await ProductModel.findById(productId);

    if (!product) {
      return res.json({
        errorMessage: "Product not found",
        resStatus: false,
      });
    }
    const productuser = product.sellerDetails;

    const userData = await User.findById(productuser);
    return res.json({
      successMessage: "Product Details",
      resStatus: true,
      Product: product,
      User: userData,
    });
  } catch (error) {
    return res.status(500).json({ errorMessage: "Server error", error: error });
  }
};

///*? Get Products By Seller Logged In

exports.getProductsByUserLoggedIn = async (req, res) => {
  const loggedInUser = req.user.id;
  try {
    const products = await ProductModel.find({
      sellerDetails: loggedInUser,
    });
    if (!products) {
      return res.json({
        errorMessage: "No Product Available",
        resStatus: false,
      });
    }
    return res.json({
      successMessage: "Product Added By You.",
      resStatus: true,
      Products: products,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ errorMessage: "Server error", resStatus: false, error });
  }
};

//- Delete Product By Authentic Seller By Product Id Seller Controller

exports.deleteProductByProductId = async (req, res) => {
  const user = req.user;
  if (user.role === "user") {
    return res.json({
      errorMessage: "You are not authorized",
      resStatus: false,
    });
  }

  const productId = req.params.id;

  try {
    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.json({
        errorMessage: "Product not Available",
        resStatus: false,
      });
    }
    if (user.role != "admin" && user.id != product.sellerDetails.toString()) {
      return res.json({
        errorMessage: "You are not authorized",
        resStatus: false,
      });
    }

    await ProductModel.findByIdAndDelete(productId);
    return res.json({
      successMessage: "Product Deleted",
      resStatus: true,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ errorMessage: "Server error", resStatus: false, error });
  }
};

//* Update Product By Seller Added Product Seller Controller

exports.updateProductBySeller = async (req, res) => {
  const user = req.user;
  const productId = req.params.id;
  const product = await ProductModel.findById(productId);

  if (!product) {
    return res.json({ errorMessage: "Product not found", resStatus: false });
  }

  if (user.role != "admin" && user.id != product.sellerDetails.toString()) {
    return res.json({
      errorMessage: "You are not authorized",
      resStatus: false,
    });
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
    successMessage: "Product Updated successfully",
    reqStatus: true,
    Product: updateProduct,
  });
};

// ? Get Product By Search Query

exports.getProductBySearchQuery = async (req, res) => {
  const { searchQuery } = req.params;
  const searchText = searchQuery.charAt(0).toUpperCase() + searchQuery.slice(1);

  try {
    const products = await ProductModel.find({
      $or: [
        { productName: { $regex: searchText, $options: "i" } },
        { productCategory: { $regex: searchText, $options: "i" } },
        // { productPrice: { $regex: searchQuery, $options: "i" } },
      ],
    });
    if (products.length < 1) {
      return res.json({
        errorMessage: "No Product Available",
        resStatus: false,
      });
    }
    return res.json({
      successMessage: "Product Added By You.",
      resStatus: true,
      Products: products,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ errorMessage: "Server error", resStatus: false, error });
  }
};
