const { check } = require("express-validator");
const validateResult = require("../utils/handleValidator");

const validatorGetItem = [
  check("id").notEmpty().exists().isMongoId(),
  (req, res, next) => validateResult(req, res, next),
];

module.exports = validatorGetItem;
