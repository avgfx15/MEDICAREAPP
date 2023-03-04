const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
const orderSchema = new mongoose.Schema(
  {
    userData: {
      id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      name: { type: mongoose.Schema.Types.String, ref: "User" },
    },
    sellerData: {
      id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      name: { type: mongoose.Schema.Types.String, ref: "User" },
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "ProductModel",
        },
        productName: {
          type: mongoose.Schema.Types.String,
          ref: "ProductModel",
        },
        productPrice: {
          type: mongoose.Schema.Types.Number,
          ref: "ProductModel",
        },
        productQty: { type: mongoose.Schema.Types.Number, ref: "ProductModel" },
      },
    ],
    orderQty: {
      type: Number,
      default: 1,
    },
    totalAmt: {
      type: Number,
    },
  },
  { timestamps: true }
);

//Export the model
const OrderModel = mongoose.model("OrderModel", orderSchema);

module.exports = OrderModel;
