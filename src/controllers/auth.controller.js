const { matchedData } = require("express-validator");
const { tokenSign } = require("../utils/handleJWT");
const handleHttpError = require("../utils/handleError");
const authService = require("../services/auth.service");

const login = async (req, res) => {
  try {
    const { email, password } = matchedData(req);
    const user = await authService.login(email, password);
    const token = await tokenSign(user);
    res.status(200).send({ token, user });
  } catch (error) {
    handleHttpError(res, `ERROR_LOGIN_USER: ${error}`);
  }
};

const register = async (req, res) => {
  try {
    const userData = matchedData(req);
    const user = await authService.create(userData);
    const token = await tokenSign(user);
    res.status(201).send({ token, user });
  } catch (error) {
    handleHttpError(res, "ERROR_REGISTER_USER");
  }
};

module.exports = { login, register };
