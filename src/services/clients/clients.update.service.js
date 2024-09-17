const { matchedData } = require("express-validator");
const { clientModel } = require("../../models");
const handleHttpError = require("../../utils/handleError");
const { verifyToken } = require("../../utils/handleJWT");
const { default: mongoose } = require("mongoose");

const updateClientService = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ").pop();
    const IDProperty = process.env.DB_ENGINE === "nosql" ? "_id" : "id";

    const payload = await verifyToken(token);
    const userId = payload[IDProperty];

    if (!userId) {
      throw new Error("User ID not found in token");
    }

    const { id, ...body } = matchedData(req);

    if (!id) {
      throw new Error("Client ID is missing");
    }

    let existingClient;
    if (process.env.DB_ENGINE === "nosql") {
      existingClient = await clientModel.findOne({
        _id: id,
        userId: mongoose.Types.ObjectId(userId),
      });
    } else {
      existingClient = await clientModel.findOne({
        where: {
          id: id,
          userId: userId,
        },
      });
    }

    if (existingClient) {
      let updatedClient;
      if (process.env.DB_ENGINE === "nosql") {
        updatedClient = await clientModel.findByIdAndUpdate(id, body, {
          new: true,
        });
      } else {
        const [_result, updatedRows] = await clientModel.update(body, {
          where: { id },
          returning: true,
          plain: true,
        });
        console.log({ updatedRows });
        if (updatedRows > 0) {
          updatedClient = updatedRows[0];
        } else {
          throw new Error("No rows were updated");
        }
      }

      return res.send({ data: { message: "Rows updated successfully" } });
    } else {
      handleHttpError(res, "UNAUTHORIZED", 403);
    }
  } catch (error) {
    handleHttpError(res, `ERROR_UPDATE_CLIENT_SERVICE: ${error}`);
  }
};

module.exports = { updateClientService };
