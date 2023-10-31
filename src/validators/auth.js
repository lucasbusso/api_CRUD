const { check } = require("express-validator");
const validateResult = require("../utils/handleValidator");

const validatorLogin = [
  check("email").notEmpty().exists().isEmail(),
  check("password").notEmpty().exists(),
  (req, res, next) => validateResult(req, res, next),
];

const validatorRegister = [
  check("firstName").notEmpty().exists(),
  check("lastName").notEmpty().exists(),
  check("ownBusiness").notEmpty().exists(),
  check("email").notEmpty().exists().isEmail(),
  check("password").notEmpty().exists(),
  (req, res, next) => validateResult(req, res, next),
];

module.exports = { validatorRegister, validatorLogin };
