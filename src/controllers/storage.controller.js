const { matchedData } = require("express-validator");
const handleHttpError = require("../utils/handleError");
const {
  getStorageListService,
  getStorageDetailsService,
  createStorageRecordService,
  deleteStorageRecordService,
} = require("../services/storage.service");

const PUBLIC_URL = process.env.PUBLIC_URL;

const getStorageList = async (req, res) => {
  try {
    const { length, data } = await getStorageListService(res);
    res.status(200).send({ length, data });
  } catch (error) {
    handleHttpError(res, "ERROR_GET_ITEMS");
  }
};

const getStorageDetail = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const data = await getStorageDetailsService(id, res);
    res.status(200).send(data);
  } catch (error) {
    handleHttpError(res, "ERROR_GET_ITEM");
  }
};

const createStorageRecord = async (req, res) => {
  try {
    const { file } = req;
    const body = {
      url: `${PUBLIC_URL}/${file.filename}`,
      filename: file.filename,
    };
    const response = await createStorageRecordService(body, res);
    res.status(201).send(response);
  } catch (error) {
    console.log({ error });
    handleHttpError(res, "ERROR_UPLOAD_ITEM");
  }
};

const deleteStorageRecord = async (req, res) => {
  try {
    req = matchedData(req);
    const id = req.id;
    const data = await deleteStorageRecordService(id, res);
    res.status(201).send(data);
  } catch (error) {
    handleHttpError(res, "ERROR_DELETE_ITEM");
  }
};

module.exports = {
  getStorageList,
  getStorageDetail,
  createStorageRecord,
  deleteStorageRecord,
};
