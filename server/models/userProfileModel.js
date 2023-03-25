const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
const userProfileModelSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  street: { type: String },
  area: { type: String },
  location: { type: String },
  city: { type: String },
  country: { type: String },
  zipcode: { type: String },
});

//Export the model
const UserProdileModel = mongoose.model(
  "UserProdileModel",
  userProfileModelSchema
);

module.exports = UserProdileModel;
