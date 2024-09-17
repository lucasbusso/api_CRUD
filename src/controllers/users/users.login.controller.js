const { matchedData } = require("express-validator");
const { tokenSign } = require("../../utils/handleJWT");
const handleHttpError = require("../../utils/handleError");
const { loginService } = require("../../services/users");

const loginController = async (req, res) => {
  try {
    const { email, password } = matchedData(req);
    const user = await loginService(email, password);
    const token = await tokenSign(user);
    res.status(200).send({ token, user });
  } catch (error) {
    handleHttpError(res, `ERROR_LOGIN_USER: ${error}`);
  }
};

module.exports = loginController;
