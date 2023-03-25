const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var orderModel = new mongoose.Schema(
  {
    orderItems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "OrderItemsModel",
      },
    ],
    orderDate: {
      type: Date,
      default: Date.now,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    shippingAddress1: {
      type: String,
    },
    shippingAddress2: {
      type: String,
    },
    city: {
      type: String,
    },
    zipcode: {
      type: String,
    },
    country: {
      type: String,
    },
    totalPrice: {
      type: Number,
    },
    isPaid: {
      type: String,
      default: "Pending",
    },
    paidAt: {
      type: String,
    },
    isDelivered: {
      type: Boolean,
      default: false,
    },
    deliveredAt: {
      type: String,
    },
    paymentMethod: {
      type: String,
    },
    // paymentResult: {
    //   id: { type: String },
    //   paymentStatus: { type: Boolean },
    // },
    // taxPrice: { type: Number },
    // shippingPrice: { type: Number },
  },
  { timestamps: true }
);

orderModel.virtual("id").get(function () {
  return this._id.toHexString();
});

orderModel.set("toJSON", {
  virtuals: true,
});

///Export the model
const OrderModel = mongoose.model("OrderModel", orderModel);
module.exports = OrderModel;
