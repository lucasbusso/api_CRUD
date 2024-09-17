const { matchedData } = require("express-validator");
const { clientModel } = require("../../models");
const handleHttpError = require("../../utils/handleError");
const { verifyToken } = require("../../utils/handleJWT");
const { default: mongoose } = require("mongoose");

const deleteClientService = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ").pop();
    const IDProperty = process.env.DB_ENGINE === "nosql" ? "_id" : "id";

    const payload = await verifyToken(token);
    const userId = payload[IDProperty];

    if (!userId) {
      throw new Error("User ID not found in token");
    }

    const { id } = matchedData(req);

    if (!id) {
      throw new Error("Client ID is missing");
    }

    let existingClient;
    if (process.env.DB_ENGINE === "nosql") {
      existingClient = await clientModel.findOne({
        _id: id,
        userId: mongoose.Types.ObjectId(userId),
      });

      if (existingClient) {
        const result = await clientModel.deleteOne({ _id: id });
        if (result.deletedCount > 0) {
          return { message: "Client deleted successfully" };
        } else {
          throw new Error("Client not found or not deleted");
        }
      } else {
        handleHttpError(res, "UNAUTHORIZED", 403);
      }
    } else {
      existingClient = await clientModel.findOne({
        where: {
          id: id,
          userId: userId,
        },
      });

      if (existingClient) {
        const result = await clientModel.destroy({
          where: { id },
        });

        if (result > 0) {
          return { message: "Client deleted successfully" };
        } else {
          throw new Error("Client not found or not deleted");
        }
      } else {
        handleHttpError(res, "UNAUTHORIZED", 403);
      }
    }
  } catch (error) {
    handleHttpError(res, `ERROR_DELETE_CLIENT_SERVICE: ${error}`);
  }
};

module.exports = deleteClientService;
