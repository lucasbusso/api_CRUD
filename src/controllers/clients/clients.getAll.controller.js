const handleHttpError = require("../../utils/handleError");
const { getClientsService } = require("../../services/clients");

const getAllClientsController = async (req, res) => {
  try {
    const client = await getClientsService(req, res);
    res.status(200).send(client);
  } catch (error) {
    handleHttpError(res, "ERROR_GET_CLIENTS");
  }
};

module.exports = { getAllClientsController };
