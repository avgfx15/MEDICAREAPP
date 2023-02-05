const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
const categorySchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      trim: true,
      index: true,
      maxlength: 50,
    },
  },
  { timestamps: true }
);

//Export the model
const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
