const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
const productSchema = new mongoose.Schema(
  {
    productImage: {
      type: String,
      required: true,
    },
    productName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    productDescription: {
      type: String,
      required: true,
      trim: true,
    },
    productCategory: {
      type: mongoose.Schema.Types.String,
      ref: "categoryModel",
      // required: true,
    },
    productPrice: {
      type: Number,
      required: true,
    },
    productQty: {
      type: Number,
      default: 1,
    },
    sellerDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

//Export the model
const ProductModel = mongoose.model("ProductModel", productSchema);
module.exports = ProductModel;
