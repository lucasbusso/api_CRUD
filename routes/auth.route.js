const express = require("express");
const {
  validatorLogin,
  validatorRegister,
} = require("../utils/validators/auth");
const { login, register } = require("../controllers/auth.controller");

const router = express.Router();

router.post("/register", validatorRegister, register);
router.post("/login", validatorLogin, login);

module.exports = router;
