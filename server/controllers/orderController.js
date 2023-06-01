const { default: Stripe } = require("stripe");
const OrderItemsModel = require("../models/orderItemsModel");
const OrderModel = require("../models/orderModel");
const stripe = require("stripe")(
  "sk_test_51Mpi6hSJqIJ0daJKdAkyTeevR5zbwrxx7vb924GUfY9u4R7bcodfWNVNNYnc3jHObiKrGvKJ6IJZZ0nz1KBbVAu300rLRSFeTo"
);
const ProductModel = require("../models/productModel");

/// TEST ROUTE FOR ORDER
exports.orderroutesTest = async (req, res) => {
  res.send("Order Routes Test is OK");
};

//+ POST NEW ORDER BY USER

exports.newOrderByUser = async (req, res) => {
  /// GET SIGNIN USER DETAILS
  const userSignIn = req.user.id;
  /// IF SIGNIN USER IS NOT AVAILABLE
  if (!userSignIn) {
    return res.json({
      errorMessage: "User not Authorized",
      resStatus: false,
    });
  }
  /// ORDER ITEMS IN ORDERITEMSMODEL BY MAP
  const orderItemsIds = Promise.all(
    req.body.orderItems.map(async (orderItem) => {
      let newOrderItem = new OrderItemsModel({
        orderQty: orderItem.orderQty,
        product: orderItem.product,
      });
      const saveNewOrderItem = await newOrderItem.save();

      return saveNewOrderItem._id;
    })
  );
  /// IT GIVES PROMISS SO TO RESOLVE THIS ID
  const orderItemsIdsResolved = await orderItemsIds;

  /// TO CALCULATE TOTALPRICE BY PRODUCT AND FINAL TOTAL PRICE ARRAY FOR ALL PRODUCTS BY MAP WITH PROMISS
  const totalPrices = await Promise.all(
    orderItemsIdsResolved.map(async (orderItemId) => {
      const getOrderItem = await OrderItemsModel.findById(orderItemId).populate(
        "product",
        "productPrice"
      );
      const totalPrice =
        getOrderItem.product.productPrice * getOrderItem.orderQty;
      return totalPrice;
    })
  );

  /// TO CALCULATE SUM OF TOTALPRICES OF ALL PRODUCTS AND FINAL TOTAL SHIPPING PRICE
  const shippingPrice = totalPrices.reduce((a, b) => a + b, 0);

  try {
    // / DESTRUCTURE REQ.BODY
    const {
      orderDate,
      shippingAddress1,
      shippingAddress2,
      city,
      zipcode,
      country,
      isPaid,
      paidAt,
      isDelivered,
      deliveredAt,
      paymentMethod,
    } = req.body;

    /// CREATE NEW ORDER OBJECT BY NEW REQ.BODY DATA
    const order = new OrderModel({
      orderItems: orderItemsIdsResolved,
      user: userSignIn,
      orderDate: orderDate,
      shippingAddress1: shippingAddress1,
      shippingAddress2: shippingAddress2,
      city: city,
      zipcode: zipcode,
      country: country,
      totalPrice: shippingPrice,
      isPaid: isPaid,
      paidAt: paidAt,
      isDelivered: isDelivered,
      deliveredAt: deliveredAt,
      paymentMethod: paymentMethod,
    });
    /// SAVE NEW ORDER IN DATABASE
    const createdOrder = await order.save();
    return res.json({
      order: createdOrder,
      successMessage: "Order Created successfully",
      resStatus: true,
    });
  } catch (error) {
    console.log("Add To Cart", error);
  }
};

// + CHECKOUT SESSION FOR PAYMENT

exports.checkOutSessionForPayment = async (req, res) => {
  const orderItems = req.body;
  if (!orderItems) {
    return res.json({
      errorMessage: "Payment CheckOut Session can't be Created",
      resStatus: false,
    });
  }
  const line_items = await Promise.all(
    orderItems.map(async (orderItem) => {
      const product = await ProductModel.findById(orderItem.product);
      return {
        price_data: {
          currency: "inr",
          product_data: { name: product.productName },
          unit_amount: product.productPrice * 100,
        },
        quantity: orderItem.orderQty,
      };
    })
  );
  const stripeSession = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: line_items,
    mode: "payment",
    success_url: "http://localhost:4200/thanks",
    cancel_url: "http://localhost:4200/failure",
  });
  res.json({ id: stripeSession.id });
};

// ? GET ALLORDER DETAILS

exports.getAllOrders = async (req, res) => {
  const userSignIn = req.user;
  if (!userSignIn) {
    return res.json({ errorMessage: "User not logged In", resStatus: false });
  }
  // / Check User Role

  const userSignInRole = userSignIn.role;

  if (userSignInRole !== "admin") {
    return res.json({ errorMessage: "User not Authorized", resStatus: false });
  }
  try {
    const orderList = await OrderModel.find()
      .populate("orderItems")
      .populate("user")
      .sort({ orderDate: -1 });
    if (!orderList) {
      return res.json({ errorMessage: "No Order available", resStatus: false });
    }
    return res.json({
      successMessage: "All Order Listed Here",
      AllOrders: orderList,
      resStatus: true,
    });
  } catch (error) {
    return res.json({ errorMessage: "server error", resStatus: false, error });
  }
};

//? Get AllOrder Placed By User

exports.getAllOrderPlacedByUser = async (req, res) => {
  const userLoggedIn = req.user;
  if (!userLoggedIn) {
    return res.json({ errorMessage: "User not Authorized", resStatus: false });
  }

  try {
    const orderList = await OrderModel.find({ user: userLoggedIn.id })
      .populate("user")
      .populate({ path: "orderItems", populate: "product" });
    if (!orderList) {
      return res.json({ errorMessage: "No Order Available", resStatus: false });
    }
    return res.json({
      successMessage: "All Orders By Logged In User",
      resStatus: true,
      AllOrders: orderList,
    });
  } catch (error) {
    return res.json({ errorMessage: "Server error", resStatus: false });
  }
};

// ? GET TOTAL SALE PRICE OF ALL ORDERS IN DATABASE

exports.getTotalSaleValue = async (req, res) => {
  /// GET SIGNIN USER DETAILS
  const userSignIn = req.user.id;
  /// IF SIGNIN USER IS NOT AVAILABLE
  if (!userSignIn) {
    return res.json({
      errorMessage: "User not Authorized",
      resStatus: false,
    });
  }
  try {
    const totalSalesValue = await OrderModel.aggregate([
      { $group: { _id: null, totalSalesValue: { $sum: `$totalPrice` } } },
    ]);

    if (!totalSalesValue) {
      return res.json({
        errorMessage: "Total Sales Value Can't be generated",
        resStatus: false,
      });
    }

    return res.json({
      successMessage: "Total Sales Value generated",
      resStatus: true,
      TotalSalesValue: totalSalesValue.pop().totalSalesValue,
    });
  } catch (error) {
    return res.json({
      errorMessage: "server error",
      resStatus: false,
      error,
    });
  }
};

// ? GET TOTAL ORDER COUNT FROM USER PLACED ORDERS

exports.getCountAllOrdersPlacedByUser = async (req, res) => {
  /// GET SIGNIN USER DETAILS
  const userSignIn = req.user.id;

  /// IF SIGNIN USER IS NOT AVAILABLE
  if (!userSignIn) {
    return res.json({
      errorMessage: "User not Authorized",
      resStatus: false,
    });
  }

  try {
    const totalOrdersCount = await OrderModel.countDocuments({
      user: userSignIn,
    });

    if (!totalOrdersCount) {
      return res.json({
        errorMessage: "Still you have not placed any Order.",
        resStatus: false,
        TotalOrderCount: 0,
      });
    }

    return res.json({
      successMessage: "Total Order Count",
      resStatus: true,
      TotalOrderCount: totalOrdersCount,
    });
  } catch (error) {
    return res.json({
      errorMessage: "server error",
      resStatus: false,
      error,
    });
  }
};

// ? GET ORDER DETAILS BY ORDER ID

exports.getOrderByOrderId = async (req, res) => {
  try {
    const order = await OrderModel.findById(req.params.id)
      .populate("user", "name")
      .populate({ path: "orderItems", populate: "product" });

    if (!order) {
      return res.json({ errorMessage: "No Order available", resStatus: false });
    }
    return res.json({
      successMessage: "All Order Listed Here",
      Order: order,
      resStatus: true,
    });
  } catch (error) {
    return res.json({ errorMessage: "server error", resStatus: false, error });
  }
};

// * Update Delivery Status By Order Id

exports.updateDeliveryStatus = async (req, res) => {
  const userSignIn = req.user;
  const order = await OrderModel.findById(req.params.id);
  if (!order) {
    return res.json({ errorMessage: "No Order available", resStatus: false });
  }
  try {
    if (order.user.toString() != userSignIn.id) {
      return res.json({
        errorMessage: "User Not Authorized",
        resStatus: false,
      });
    }
    const updatedOrder = await OrderModel.findByIdAndUpdate(
      req.params.id,
      { isDelivered: req.body.isDelivered },
      { new: true }
    );

    return res.json({
      successMessage: `Payment Status ${order.isDelivered}`,
      resStatus: true,
      Order: updatedOrder,
    });
  } catch (error) {
    return res.json({
      errorMessage: "Server Error From Update Delivery Status",
      resStatus: false,
      error,
    });
  }
};

// * Update Payment Status By Order Id

exports.updatePaymentStatus = async (req, res) => {
  const userSignIn = req.user;
  const order = await OrderModel.findById(req.params.id);
  if (!order) {
    return res.json({ errorMessage: "No Order available", resStatus: false });
  }
  try {
    if (order.user.toString() != userSignIn.id) {
      return res.json({
        errorMessage: "User Not Authorized",
        resStatus: false,
      });
    }
    const updatedOrder = await OrderModel.findByIdAndUpdate(
      req.params.id,
      { isPaid: req.body.isPaid },
      { new: true }
    );

    return res.json({
      successMessage: `Payment Status ${order.isPaid}`,
      resStatus: true,
      Order: updatedOrder,
    });
  } catch (error) {
    return res.json({
      errorMessage: "Server Error From Update Delivery Status",
      resStatus: false,
      error,
    });
  }
};

// - Delete Order By Order Id

exports.deleteOrderByOrderId = async (req, res) => {
  const userSignIn = req.user;
  const order = await OrderModel.findById(req.params.id);
  if (!order) {
    return res.json({ errorMessage: "No Order available", resStatus: false });
  }
  try {
    if (userSignIn.role != "admin" && order.user.toString() != userSignIn.id) {
      return res.json({
        errorMessage: "User Not Authorized",
        resStatus: false,
      });
    }
    await order.orderItems.map(async (orderItem) => {
      if (!orderItem) {
        return res.json({
          errorMessage: "Order Item Not Found",
          resStatus: false,
        });
      }
      await OrderItemsModel.findByIdAndDelete(orderItem);
    });
    await order.remove();

    return res.json({
      successMessage: `Order Deleted Successfully`,
      resStatus: true,
    });
  } catch (error) {
    return res.json({
      errorMessage: "Server Error From Update Delivery Status",
      resStatus: false,
      error,
    });
  }
};

// ? Get All Orders Count ADMIN ROUTE

exports.getAllOrdersCount = async (req, res) => {
  const userSignIn = req.user;
  if (!userSignIn) {
    return res.json({ errorMessage: "User Not Looged In", resStatus: false });
  }
  try {
    const userRole = userSignIn.role;
    if (userRole != "admin") {
      return res.json({
        errorMessage: "You are not Authorized",
        resStatus: false,
      });
    }
    const totalOrdersCount = await OrderModel.countDocuments({});

    if (!totalOrdersCount) {
      return res.json({
        errorMessage: "Total Order Count Can't be generated",
        resStatus: false,
      });
    }

    return res.json({
      successMessage: "Total Order Count",
      resStatus: true,
      TotalOrderCount: totalOrdersCount,
    });
  } catch (error) {
    return res.json({
      errorMessage: "Server Error From Update Delivery Status",
      resStatus: false,
      error,
    });
  }
};

// ? Get Seller All Order Of Seller Products In Order
exports.sellerProductsFromOrder = async (req, res) => {
  const userSignIn = req.user;
  // const sellerId = userSignIn.id;

  if (!userSignIn) {
    return res.json({ errorMessage: "User Not Looged In", resStatus: false });
  }

  try {
    const order = await OrderModel.find()
      .populate("user")
      .populate("orderItems")
      .populate({ path: "orderItems", populate: "product" });

    return res.json(order);
  } catch (error) {
    console.log(error);
  }
};
