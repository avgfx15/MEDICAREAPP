const ProductModel = require("../models/ProductModel");
exports.testController = async (req, res) => {
  console.log("Seller Test Route");
};

exports.addNewProductController = async (req, res) => {
  const {
    productImage,
    productName,
    productDescription,
    productCategory,
    productPrice,
    productQty,
  } = req.body;

  const checkProduct = await ProductModel.findOne({ productName: productName });
  if (checkProduct) {
    return res.json({
      errorMessage: "Product Already exist",
      resStatus: false,
    });
  }
  const newProduct = new ProductModel({
    productImage: productImage,
    productName: productName,
    productDescription: productDescription,
    productCategory: productCategory,
    productPrice: productPrice,
    productQty: productQty,
  });
  await newProduct.save();
  return res.json({
    successMessage: "Product saved successfully",
    resStatus: true,
    product: newProduct,
  });
};
