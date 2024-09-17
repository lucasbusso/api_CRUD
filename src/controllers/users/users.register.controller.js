const { matchedData } = require("express-validator");
const { tokenSign } = require("../../utils/handleJWT");
const handleHttpError = require("../../utils/handleError");
const { registerService } = require("../../services/users");

const registerController = async (req, res) => {
  try {
    const userData = matchedData(req);
    const user = await registerService(userData);
    const token = await tokenSign(user);
    res.status(201).send({ token, user });
  } catch (error) {
    handleHttpError(res, "ERROR_REGISTER_USER");
  }
};

module.exports = { registerController };
