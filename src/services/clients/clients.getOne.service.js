const { matchedData } = require("express-validator");
const { clientModel } = require("../../models");
const handleHttpError = require("../../utils/handleError");
const { verifyToken } = require("../../utils/handleJWT");
const { default: mongoose } = require("mongoose");

const getClientService = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ").pop();
    const IDProperty = process.env.DB_ENGINE === "nosql" ? "_id" : "id";

    const payload = await verifyToken(token);
    const userId = payload[IDProperty];

    if (!userId) {
      throw new Error("User ID not found in token");
    }

    const { id } = matchedData(req);

    let data;

    if (process.env.DB_ENGINE === "nosql") {
      data = await clientModel.findOne({
        _id: mongoose.Types.ObjectId(id),
        userId: mongoose.Types.ObjectId(userId),
      });
    } else {
      data = await clientModel.findOne({
        where: {
          id: id,
          userId: userId,
        },
      });
    }

    if (!data) {
      handleHttpError(res, "CLIENT_NOT_FOUND", 404);
    } else {
      return data;
    }
  } catch (error) {
    handleHttpError(res, `ERROR_GET_CLIENT_SERVICE: ${error}`);
  }
};

module.exports = { getClientService };
