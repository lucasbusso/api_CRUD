const { clientModel } = require("../../models");
const handleHttpError = require("../../utils/handleError");
const { verifyToken } = require("../../utils/handleJWT");
const { default: mongoose } = require("mongoose");

const getClientsService = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ").pop();

    const IDProperty = process.env.DB_ENGINE === "nosql" ? "_id" : "id";

    const payload = await verifyToken(token);
    const userId = payload[IDProperty];

    if (!userId) {
      throw new Error("User ID not found in token");
    }

    const { filter } = req.query;

    let query = {};

    if (process.env.DB_ENGINE === "nosql") {
      query.userId = mongoose.Types.ObjectId(userId);
      if (filter) {
        query.role = filter;
      }
      const data = await clientModel.find(query);
      const length = data.length;
      return { data, length };
    } else {
      query.userId = userId;
      if (filter) {
        query.role = filter;
      }
      const data = await clientModel.findAll({
        where: query,
      });
      const length = data.length;
      return { data, length };
    }
  } catch (error) {
    console.log(error);
    handleHttpError(res, `ERROR_GET_CLIENT_SERVICE: ${error}`);
  }
};

module.exports = getClientsService;
