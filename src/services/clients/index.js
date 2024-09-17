const createClientService = require("./clients.create.service");
const deleteClientService = require("./clients.delete.service");
const updateClientService = require("./clients.update.service");
const getAllClientsService = require("./clients.getAll.service");
const getClientService = require("./clients.getOne.service");

module.exports = {
  createClientService,
  deleteClientService,
  updateClientService,
  getAllClientsService,
  getClientService,
};
