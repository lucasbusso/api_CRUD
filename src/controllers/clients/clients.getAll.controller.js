const handleHttpError = require("../../utils/handleError");
const { getAllClientsService } = require("../../services/clients");

const getAllClientsController = async (req, res) => {
  try {
    const client = await getAllClientsService(req, res);
    res.status(200).send(client);
  } catch (error) {
    handleHttpError(res, `ERROR_GET_CLIENTS: ${error}`);
  }
};

module.exports = { getAllClientsController };
