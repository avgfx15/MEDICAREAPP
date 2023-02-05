const Category = require("../models/categoryModel");

exports.addCategory = async (req, res) => {
  const { category } = req.body;
  try {
    const checkCategory = await Category.findOne({ category });
    if (checkCategory) {
      return (
        res
          // .status(403)
          .json({ errorMessage: "Category Already Exist", resStatus: false })
      );
    }
    let newCategory = new Category();
    newCategory.category = category;
    newCategory = await newCategory.save();
    res.status(200).json({
      successMessage: `${newCategory.category}` + ` New Category Added`,
      resStatus: true,
      category: newCategory,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ errorMessage: "Server error", resStatus: false, error });
  }
};
