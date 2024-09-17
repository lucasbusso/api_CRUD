const handleHttpError = require("../../utils/handleError");
const { getClientService } = require("../../services/clients");

const getClientController = async (req, res) => {
  try {
    const data = await getClientService(req, res);
    res.status(200).send(data);
  } catch (error) {
    handleHttpError(res, "ERROR_GET_CLIENT", 404);
  }
};

module.exports = { getClientController };
