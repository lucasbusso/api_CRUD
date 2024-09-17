const handleHttpError = require("../../utils/handleError");
const { updateClientService } = require("../../services/clients");

const updateClientController = async (req, res) => {
  try {
    const data = await updateClientService(req, res);
    res.status(201).send(data);
  } catch (error) {
    handleHttpError(res, "ERROR_UPDATE_CLIENT");
  }
};

module.exports = { updateClientController };
