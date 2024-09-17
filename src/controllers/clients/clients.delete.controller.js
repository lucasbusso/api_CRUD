const handleHttpError = require("../../utils/handleError");
const { deleteClientService } = require("../../services/clients");

const deleteClientController = async (req, res) => {
  try {
    const data = await deleteClientService(req, res);
    res.status(201).send(data);
  } catch (error) {
    handleHttpError(res, "ERROR_DELETE_CLIENT");
  }
};

module.exports = { deleteClientController };
