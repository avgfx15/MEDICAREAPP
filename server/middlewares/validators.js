const { check, validationResult } = require("express-validator");

//` Sign up Validator with Message
exports.signupvalidator = [
  check("name").not().isEmpty().trim().withMessage("name is required"),
  check("email").isEmail().normalizeEmail().withMessage("email is required"),
  check("mobile")
    .isLength({ min: 10, max: 10 })
    .trim()
    .withMessage("Mobile no must be 10 to 12 in length"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters long"),
];

//` Signin Validator with Message
exports.signinvalidator = [
  check("email").isEmail().normalizeEmail().withMessage("email is required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters long"),
];

//` Validator Result Error Message
exports.validatorResult = async (req, res, next) => {
  const hasErrors = validationResult(req);
  if (!hasErrors.isEmpty()) {
    return res.status(400).json({ errors: hasErrors.array() });
  }
  next();
};
