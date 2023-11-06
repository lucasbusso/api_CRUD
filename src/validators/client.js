const { check } = require("express-validator");
const validateResult = require("../utils/handleValidator");

const validatorCreateItem = [
  check("firstName").notEmpty().exists(),
  check("lastName").notEmpty().exists(),
  check("businessName").notEmpty().exists(),
  check("email").notEmpty().exists(),
  check("phone").notEmpty().exists(),
  check("debt").notEmpty().exists(),
  check("role").notEmpty().exists(),
  check("isActive").notEmpty().exists(),
  (req, res, next) => validateResult(req, res, next),
];

const validatorGetItem = [
  check("id").notEmpty().exists().isMongoId(),
  (req, res, next) => validateResult(req, res, next),
];

module.exports = { validatorCreateItem, validatorGetItem };
