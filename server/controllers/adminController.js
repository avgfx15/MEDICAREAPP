const User = require("../models/userModel");

exports.testadmin = async (req, res) => {
  console.log("2");
  const userId = req.params.id;
  console.log(userId);
  const user = await User.findOne({ _id: userId });
  console.log(user);
};
