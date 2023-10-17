const handleHttpError = require("../utils/handleError");
const { verifyToken } = require("../utils/handleJWT");
const { userModel } = require("../models");

const authMiddleware = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return handleHttpError(res, "NO_TOKEN", 401);
    }
    const token = req.headers.authorization.split(" ").pop();
    const payload = await verifyToken(token); // payload: {_id: '652d816dd4569de85020c1c7', role: [ 'user' ], iat: 1697547510, exp: 1697554710 }
    if (!payload._id) {
      return handleHttpError(res, "NO_ID", 401);
    }
    const user = await userModel.findById(payload._id);
    console.log(user);
    req.user = user;
    next();
  } catch (error) {
    handleHttpError(res, "SESSION_ERROR", 401);
  }
};

module.exports = authMiddleware;
