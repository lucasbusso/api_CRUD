const fs = require("fs");
const { storageModel } = require("../models");
const handleHttpError = require("../utils/handleError");

const getStorageListService = async (res) => {
  try {
    const data = await storageModel.find({});
    const length = data.length;
    return { length, data };
  } catch (error) {
    handleHttpError(res, "SERVICE_ERROR");
  }
};

const getStorageDetailsService = async (id, res) => {
  try {
    const data = await storageModel.findById(id);
    if (data) return data;
  } catch (error) {
    handleHttpError(res, "SERVICE_ERROR");
  }
};

const createStorageRecordService = async (body, res) => {
  try {
    const data = await storageModel.create(body);
    return data;
  } catch (error) {
    handleHttpError(res, "SERVICE_ERROR");
  }
};

const MEDIA_PATH = `${__dirname}/../storage`;

const deleteStorageRecordService = async (id, res) => {
  try {
    const findMedia = await storageModel.findById(id);
    const fileName = findMedia.filename;
    await storageModel.delete({ _id: id });
    fs.unlinkSync(`${MEDIA_PATH}/${fileName}`);
    const data = {
      findMedia: fileName,
      deleted: true,
    };
    return data;
  } catch (error) {
    console.log({ error });
    handleHttpError(res, "SERVICE_ERROR");
  }
};

module.exports = {
  getStorageListService,
  getStorageDetailsService,
  createStorageRecordService,
  deleteStorageRecordService,
};
