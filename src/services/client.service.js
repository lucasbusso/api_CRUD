const { matchedData } = require("express-validator");
const { clientModel } = require("../models");
const handleHttpError = require("../utils/handleError");
const { verifyToken } = require("../utils/handleJWT");
const { default: mongoose } = require("mongoose");

const getClientsService = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ").pop();

    const IDProperty = process.env.DB_ENGINE === "nosql" ? "_id" : "id";

    const payload = await verifyToken(token);
    const userId = payload[IDProperty];

    if (!userId) {
      throw new Error("User ID not found in token");
    }

    const { filter } = req.query;

    let query = {};

    if (process.env.DB_ENGINE === "nosql") {
      query.userId = mongoose.Types.ObjectId(userId);
      if (filter) {
        query.role = filter;
      }
      const data = await clientModel.find(query);
      const length = data.length;
      return { data, length };
    } else {
      query.userId = userId;
      if (filter) {
        query.role = filter;
      }
      const data = await clientModel.findAll({
        where: query,
      });
      const length = data.length;
      return { data, length };
    }
  } catch (error) {
    console.log(error);
    handleHttpError(res, `ERROR_GET_CLIENT_SERVICE: ${error}`);
  }
};

const getClientService = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ").pop();
    const IDProperty = process.env.DB_ENGINE === "nosql" ? "_id" : "id";

    const payload = await verifyToken(token);
    const userId = payload[IDProperty];

    if (!userId) {
      throw new Error("User ID not found in token");
    }

    const { id } = matchedData(req);

    let data;

    if (process.env.DB_ENGINE === "nosql") {
      data = await clientModel.findOne({
        _id: mongoose.Types.ObjectId(id),
        userId: mongoose.Types.ObjectId(userId),
      });
    } else {
      data = await clientModel.findOne({
        where: {
          id: id,
          userId: userId,
        },
      });
    }

    if (!data) {
      handleHttpError(res, "CLIENT_NOT_FOUND", 404);
    } else {
      return data;
    }
  } catch (error) {
    handleHttpError(res, `ERROR_GET_CLIENT_SERVICE: ${error}`);
  }
};

const createClientService = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ").pop();
    const body = matchedData(req);
    let data;

    const validRoles = ["proveedor", "cliente"];
    if (!validRoles.includes(body.role)) {
      throw new Error("Invalid role value");
    }

    const IDProperty = process.env.DB_ENGINE === "nosql" ? "_id" : "id";

    const payload = await verifyToken(token);
    const userId = payload[IDProperty];

    if (!userId) {
      throw new Error("User ID not found in token");
    }

    if (process.env.DB_ENGINE === "nosql") {
      data = await clientModel.create({
        ...body,
        userId: mongoose.Types.ObjectId(userId),
      });
    } else {
      data = await clientModel.create({
        ...body,
        userId: userId,
      });
    }
    return data;
  } catch (error) {
    handleHttpError(res, `ERROR_CREATE_CLIENT_SERVICE: ${error}`);
  }
};
const updateClientService = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ").pop();
    const IDProperty = process.env.DB_ENGINE === "nosql" ? "_id" : "id";

    const payload = await verifyToken(token);
    const userId = payload[IDProperty];

    if (!userId) {
      throw new Error("User ID not found in token");
    }

    const { id, ...body } = matchedData(req);

    if (!id) {
      throw new Error("Client ID is missing");
    }

    let existingClient;
    if (process.env.DB_ENGINE === "nosql") {
      existingClient = await clientModel.findOne({
        _id: id,
        userId: mongoose.Types.ObjectId(userId),
      });
    } else {
      existingClient = await clientModel.findOne({
        where: {
          id: id,
          userId: userId,
        },
      });
    }

    if (existingClient) {
      let updatedClient;
      if (process.env.DB_ENGINE === "nosql") {
        updatedClient = await clientModel.findByIdAndUpdate(id, body, {
          new: true,
        });
      } else {
        const [_result, updatedRows] = await clientModel.update(body, {
          where: { id },
          returning: true,
          plain: true,
        });
        console.log({ updatedRows });
        if (updatedRows > 0) {
          updatedClient = updatedRows[0];
        } else {
          throw new Error("No rows were updated");
        }
      }

      return res.send({ data: { message: "Rows updated successfully" } });
    } else {
      handleHttpError(res, "UNAUTHORIZED", 403);
    }
  } catch (error) {
    handleHttpError(res, `ERROR_UPDATE_CLIENT_SERVICE: ${error}`);
  }
};

const deleteClientService = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ").pop();
    const IDProperty = process.env.DB_ENGINE === "nosql" ? "_id" : "id";

    const payload = await verifyToken(token);
    const userId = payload[IDProperty];

    if (!userId) {
      throw new Error("User ID not found in token");
    }

    const { id } = matchedData(req);

    if (!id) {
      throw new Error("Client ID is missing");
    }

    let existingClient;
    if (process.env.DB_ENGINE === "nosql") {
      existingClient = await clientModel.findOne({
        _id: id,
        userId: mongoose.Types.ObjectId(userId),
      });

      if (existingClient) {
        const result = await clientModel.deleteOne({ _id: id });
        if (result.deletedCount > 0) {
          return res
            .status(200)
            .send({ message: "Client deleted successfully" });
        } else {
          throw new Error("Client not found or not deleted");
        }
      } else {
        handleHttpError(res, "UNAUTHORIZED", 403);
      }
    } else {
      existingClient = await clientModel.findOne({
        where: {
          id: id,
          userId: userId,
        },
      });

      if (existingClient) {
        const result = await clientModel.destroy({
          where: { id },
        });

        if (result > 0) {
          return res
            .status(200)
            .send({ message: "Client deleted successfully" });
        } else {
          throw new Error("Client not found or not deleted");
        }
      } else {
        handleHttpError(res, "UNAUTHORIZED", 403);
      }
    }
  } catch (error) {
    handleHttpError(res, `ERROR_DELETE_CLIENT_SERVICE: ${error}`);
  }
};

module.exports = {
  getClientsService,
  getClientService,
  createClientService,
  updateClientService,
  deleteClientService,
};
