const ProductModel = require("../models/ProductModel");

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

//*? Get Product By ProductId Seller Controller

exports.getProductByProductId = async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await ProductModel.findById(productId);

    if (!product) {
      return res.json({
        errorMessage: "You are not authorized",
        resStatus: false,
      });
    }

    return res.json({
      successMessage: "Product Details",
      resStatus: true,
      Product: product,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ errorMessage: "Server error", resStatus: false, error });
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
  const user = req.user.id;

  const productId = req.params.id;

  try {
    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.json({
        errorMessage: "Product not Available",
        resStatus: false,
      });
    }

    if (user != product.sellerDetails.toString()) {
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
  const user = req.user.id;
  const productId = req.params.id;
  const product = await ProductModel.findById(productId);

  if (!product) {
    return res.json({ errorMessage: "Product not found", resStatus: false });
  }
  if (user != product.sellerDetails.toString()) {
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
