const express = require("express");
const router = express.Router();
const uploadMiddleware = require("../utils/handleStorage");
const validatorGetItem = require("../utils/validator/storage");
const {
  createItem,
  getItems,
  getItem,
  updateItem,
  deleteItem,
} = require("../controllers/storage.controller");

router.get("/", getItems);
router.get("/:id", validatorGetItem, getItem);
router.post("/", uploadMiddleware.single("myfile"), createItem);
router.put("/:id", validatorGetItem, updateItem);
router.delete("/:id", deleteItem);

module.exports = router;
