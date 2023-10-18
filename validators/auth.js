const { check } = require("express-validator");
const validateResult = require("../utils/handleValidator");

const validatorLogin = [
  check("email").notEmpty().exists().isEmail(),
  check("password").notEmpty().exists(),
  (req, res, next) => validateResult(req, res, next),
];

const validatorRegister = [
  check("name").notEmpty().exists().isLength({ min: 3, max: 50 }),
  check("email").notEmpty().exists().isEmail(),
  check("password").notEmpty().exists(),
  check("age").notEmpty().exists().isNumeric(),
  (req, res, next) => validateResult(req, res, next),
];

module.exports = { validatorRegister, validatorLogin };
