const { matchedData } = require("express-validator");
const { compare, encrypt } = require("../utils/handlePassword");
const { tokenSign } = require("../utils/handleJWT");
const { userModel } = require("../models");
const handleHttpError = require("../utils/handleError");

const register = async (req, res) => {
  try {
    req = matchedData(req);
    const hashedPassword = await encrypt(req.password);
    const body = { ...req, password: hashedPassword };
    const dataUser = await userModel.create(body);
    dataUser.set("password", undefined, { strict: false });
    const data = { token: await tokenSign(dataUser), user: dataUser };
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_REGISTER_USER");
  }
};

const login = async (req, res) => {
  try {
    req = matchedData(req);
    const dataUser = await userModel
      .findOne({ email: req.email })
      .select("password name role email");
    if (!dataUser) return handleHttpError(res, "USER_NOT_REGISTERED", 404);
    const isMatch = await compare(req.password, dataUser.get("password"));
    if (!isMatch) return handleHttpError(res, "PASSWORD_INCORRECT", 401);
    dataUser.set("password", undefined, { strict: false });
    const data = { token: await tokenSign(dataUser), user: dataUser };
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_LOGIN_USER");
  }
};

module.exports = { register, login };
