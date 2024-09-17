const handleHttpError = require("../utils/handleError");
const { verifyToken } = require("../utils/handleJWT");
const { userModel } = require("../models");
const { getProperties } = require("../utils/handleEngineProperties");
const IDproperty = getProperties();

const authMiddleware = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return handleHttpError(res, "NO_TOKEN", 401);
    }
    const token = req.headers.authorization.split(" ").pop();
    const payload = await verifyToken(token);

    if (!payload) {
      return handleHttpError(res, "MISSING_PAYLOAD_ID", 401);
    }

    const query = {
      [IDproperty.id]: payload[IDproperty.id],
    };

    const user = await userModel.findOne(query);
    req.user = user;
    next();
  } catch (error) {
    handleHttpError(res, "SESSION_ERROR", 401);
  }
};

module.exports = authMiddleware;
