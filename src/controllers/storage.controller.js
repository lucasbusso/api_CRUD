const fs = require("fs");
const { matchedData } = require("express-validator");
const { storageModel } = require("../models");
const handleHttpError = require("../utils/handleError");

const PUBLIC_URL = process.env.PUBLIC_URL;
const MEDIA_PATH = `${__dirname}/../storage`;

const getItems = async (req, res) => {
  try {
    const data = await storageModel.find({});
    const length = data.length;
    res.status(200).send({ length, data });
  } catch (error) {
    handleHttpError(res, "ERROR_GET_ITEMS");
  }
};

const getItem = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const data = await storageModel.findById(id);
    res.status(200).send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_GET_ITEM");
  }
};

const createItem = async (req, res) => {
  try {
    const { file } = req;
    const body = {
      url: `${PUBLIC_URL}/${file.filename}`,
      filename: file.filename,
    };
    const response = await storageModel.create(body);
    res.status(201).send({ response });
  } catch (e) {
    handleHttpError(res, "ERROR_UPLOAD_ITEM");
  }
};

const deleteItem = async (req, res) => {
  try {
    req = matchedData(req);
    const id = req.id;
    const findMedia = await storageModel.findById(id);
    const fileName = findMedia.filename;
    await storageModel.delete({ _id: id });
    fs.unlinkSync(`${MEDIA_PATH}/${fileName}`);

    const data = {
      findMedia: fileName,
      deleted: true,
    };

    res.status(201).send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_DELETE_ITEM");
  }
};

module.exports = {
  getItems,
  getItem,
  createItem,
  deleteItem,
};
