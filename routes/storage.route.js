const express = require("express");
const router = express.Router();
const upload = require("../utils/handleStorage");
const validatorGetItem = require("../utils/validators/storage");

const {
  createItem,
  getItems,
  getItem,
  deleteItem,
} = require("../controllers/storage.controller");

router.get("/", getItems);
router.get("/:id", validatorGetItem, getItem);
router.post("/", upload.single("myfile"), createItem);
router.delete("/:id", validatorGetItem, deleteItem);

module.exports = router;
