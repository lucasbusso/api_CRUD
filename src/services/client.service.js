const { matchedData } = require("express-validator");
const { clientModel } = require("../models");
const handleHttpError = require("../utils/handleError");
const { verifyToken } = require("../utils/handleJWT");
const { default: mongoose } = require("mongoose");

const getClientsService = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ").pop();
    const { _id } = await verifyToken(token);
    const { filter } = req.query;

    let query = { userId: _id };
    if (filter) {
      query.role = filter;
    }
    const data = await clientModel.find(query);
    const length = data.length;
    return { data, length };
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_GET_CLIENT_SERVICE");
  }
};
const getClientService = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ").pop();
    const { _id } = await verifyToken(token);
    const { id } = matchedData(req);
    const data = await clientModel.findById(id);
    if (data.userId.toString() === _id) {
      return data;
    } else {
      handleHttpError(res, "UNAUTHORIZED", 403);
    }
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_GET_CLIENT_SERVICE");
  }
};
const createClientService = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ").pop();
    const { _id } = await verifyToken(token);
    const body = matchedData(req);
    const data = await clientModel.create({
      ...body,
      userId: mongoose.Types.ObjectId(_id),
    });
    return data;
  } catch (error) {
    handleHttpError(res, "ERROR_CREATE_CLIENT_SERVICE");
  }
};
const updateClientService = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ").pop();
    const { _id } = await verifyToken(token);
    const { id, ...body } = matchedData(req);
    const existingClient = await clientModel.findOne({
      _id: id,
      userId: mongoose.Types.ObjectId(_id),
    });
    if (existingClient) {
      const updatedClient = await clientModel.findByIdAndUpdate(id, body, {
        new: true,
      });
      return updatedClient;
    } else {
      handleHttpError(res, "UNAUTHORIZED", 403);
    }
  } catch (error) {
    handleHttpError(res, "ERROR_UPDATE_CLIENT_SERVICE");
  }
};
const deleteClientService = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ").pop();
    const { _id } = await verifyToken(token);
    const { id } = matchedData(req);
    const existingClient = await clientModel.findOne({
      _id: id,
      userId: mongoose.Types.ObjectId(_id),
    });
    if (existingClient) {
      const deletedClient = await clientModel.delete({ _id: id });
      return deletedClient;
    } else {
      handleHttpError(res, "UNAUTHORIZED", 403);
    }
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_DELETE_CLIENT_SERVICE");
  }
};

module.exports = {
  getClientsService,
  getClientService,
  createClientService,
  updateClientService,
  deleteClientService,
};
