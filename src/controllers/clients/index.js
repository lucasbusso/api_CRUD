const { createClientController } = require("./clients.create.controller");
const { deleteClientController } = require("./clients.delete.controller");
const { updateClientController } = require("./clients.update.controller");
const { getAllClientsController } = require("./clients.getAll.controller");
const { getClientController } = require("./clients.getOne.controller");

module.exports = {
  createClientController,
  deleteClientController,
  updateClientController,
  getAllClientsController,
  getClientController,
};
