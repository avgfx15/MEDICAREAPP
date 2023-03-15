const OrderItemsModel = require("../models/orderItemsModel");
const OrderModel = require("../models/orderModel");

/// TEST ROUTE FOR ORDER
exports.orderroutesTest = async (req, res) => {
  res.send("Order Routes Test is OK");
};

//+ POST NEW ORDER BY USER
exports.orderByUser = async (req, res) => {
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
      postalCode,
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
      postalCode: postalCode,
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

// ? GET ALLORDER DETAILS

exports.getAllOrders = async (req, res) => {
  try {
    const orderList = await OrderModel.find()
      .populate("user")
      .sort({ orderDate: -1 });
    if (!orderList) {
      return res.json({ errorMessage: "No Order available", resStatus: false });
    }
    return res.json({
      successMessage: "All Order Listed Here",
      Orders: orderList,
      resStatus: true,
    });
  } catch (error) {
    return res.json({ errorMessage: "server error", resStatus: false, error });
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
    if (order.user.toString() != userSignIn.id) {
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
