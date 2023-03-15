const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
const orderItemsModel = new mongoose.Schema(
  {
    orderQty: {
      type: Number,
      default: 1,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductModel",
    },
  },
  { timestamps: true }
);

//Export the model
const OrderItemsModel = mongoose.model("OrderItemsModel", orderItemsModel);

module.exports = OrderItemsModel;
