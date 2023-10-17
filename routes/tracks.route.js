const express = require("express");
const {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
} = require("../controllers/tracks.controller");
const {
  validatorCreateItem,
  validatorGetItem,
} = require("../utils/validators/track");

const router = express.Router();

router.get("/", getItems);
router.get("/:id", validatorGetItem, getItem);
router.post("/", validatorCreateItem, createItem);
router.put("/:id", validatorGetItem, validatorCreateItem, updateItem);
router.delete("/:id", validatorGetItem, deleteItem);

module.exports = router;
