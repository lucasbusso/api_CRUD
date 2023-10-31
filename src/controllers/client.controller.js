const { matchedData } = require("express-validator");
const handleHttpError = require("../utils/handleError");
const {
  getClientsService,
  getClientService,
  createClientService,
  updateClientService,
  deleteClientService,
} = require("../services/client.service");

const getAllClients = async (req, res) => {
  try {
    const client = await getClientsService(req, res);
    res.status(200).send(client);
  } catch (error) {
    handleHttpError(res, "ERROR_GET_CLIENTS");
  }
};
const getClient = async (req, res) => {
  try {
    const data = await getClientService(req, res);
    res.status(200).send(data);
  } catch (error) {
    handleHttpError(res, "ERROR_GET_CLIENT", 404);
  }
};
const createClient = async (req, res) => {
  try {
    const data = await createClientService(req, res);
    res.status(201).send(data);
  } catch (error) {
    handleHttpError(res, "ERROR_CREATE_CLIENT");
  }
};
const updateClient = async (req, res) => {
  try {
    const data = await updateClientService(req, res);
    res.status(201).send(data);
  } catch (error) {
    handleHttpError(res, "ERROR_UPDATE_CLIENT");
  }
};
const deleteClient = async (req, res) => {
  try {
    const data = await deleteClientService(req, res);
    res.status(201).send(data);
  } catch (error) {
    handleHttpError(res, "ERROR_DELETE_CLIENT");
  }
};

module.exports = {
  getAllClients,
  getClient,
  createClient,
  updateClient,
  deleteClient,
};
