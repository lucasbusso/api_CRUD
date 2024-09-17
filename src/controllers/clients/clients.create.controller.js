const handleHttpError = require("../../utils/handleError");
const { createClientService } = require("../../services/clients");

const createClientController = async (req, res) => {
  try {
    const data = await createClientService(req, res);
    res.status(201).send(data);
  } catch (error) {
    handleHttpError(res, "ERROR_CREATE_CLIENT");
  }
};

module.exports = { createClientController };
