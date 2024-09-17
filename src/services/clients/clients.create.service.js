const { matchedData } = require("express-validator");
const { clientModel } = require("../../models");
const handleHttpError = require("../../utils/handleError");
const { verifyToken } = require("../../utils/handleJWT");
const { default: mongoose } = require("mongoose");

const createClientService = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ").pop();
    const body = matchedData(req);
    let data;

    const validRoles = ["proveedor", "cliente"];
    if (!validRoles.includes(body.role)) {
      throw new Error("Invalid role value");
    }

    const IDProperty = process.env.DB_ENGINE === "nosql" ? "_id" : "id";

    const payload = await verifyToken(token);
    const userId = payload[IDProperty];

    if (!userId) {
      throw new Error("User ID not found in token");
    }

    if (process.env.DB_ENGINE === "nosql") {
      data = await clientModel.create({
        ...body,
        userId: mongoose.Types.ObjectId(userId),
      });
    } else {
      data = await clientModel.create({
        ...body,
        userId: userId,
      });
    }
    return data;
  } catch (error) {
    handleHttpError(res, `ERROR_CREATE_CLIENT_SERVICE: ${error}`);
  }
};

module.exports = { createClientService };
