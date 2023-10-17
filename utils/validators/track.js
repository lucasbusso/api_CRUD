const { check } = require("express-validator");
const validateResult = require("../handleValidator");

const validatorCreateItem = [
  check("name").notEmpty().exists(),
  check("album").notEmpty().exists(),
  check("cover").notEmpty().exists(),
  check("artist").notEmpty().exists(),
  check("artist.name").notEmpty().exists(),
  check("artist.nickname").notEmpty().exists(),
  check("artist.nationality").notEmpty().exists(),
  check("duration").notEmpty().exists(),
  check("duration.start").notEmpty().exists(),
  check("duration.end").notEmpty().exists(),
  check("mediaId").notEmpty().exists().isMongoId(),
  (req, res, next) => validateResult(req, res, next),
];

const validatorGetItem = [
  check("id").notEmpty().exists().isMongoId(),
  (req, res, next) => validateResult(req, res, next),
];

module.exports = { validatorCreateItem, validatorGetItem };
