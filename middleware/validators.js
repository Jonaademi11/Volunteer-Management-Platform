const { body, validationResult } = require("express-validator");
const validateRegistration = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const validateRegister = [
  body("fullName")
    .notEmpty()
    .isString()
    .withMessage("fullName is required and must be string"),
  body("email")
    .notEmpty()
    .isEmail()
    .withMessage("Email is required and must be a valid email address"),
  body("password")
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("phone").optional().isString(),

  body("languages")
    .optional()
    .isArray()
    .withMessage("Languages must be an array of strings"),

  body("skills")
    .optional()
    .isArray()
    .withMessage("Skills must be an array of strings"),
  body("role")
    .notEmpty()
    .isMongoId()
    .withMessage("Role is required and must be a valid role ID"),

  validateRegistration,
];
const validateLogin = [
  body("email")
    .notEmpty()
    .isEmail()
    .withMessage("Email is required and must email format"),
  body("password").notEmpty().withMessage("Password is required"),
  validateRegistration,
];

module.exports = {
  validateRegister,
  validateLogin,
};
