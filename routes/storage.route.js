const express = require("express");
const router = express.Router();
const upload = require("../utils/handleStorage");
const validatorGetItem = require("../utils/validators/storage");
const authMiddleware = require("../middlewares/session");

const {
  createItem,
  getItems,
  getItem,
  deleteItem,
} = require("../controllers/storage.controller");

router.get("/", authMiddleware, getItems);
router.get("/:id", authMiddleware, validatorGetItem, getItem);
router.post("/", authMiddleware, upload.single("myfile"), createItem);
router.delete("/:id", authMiddleware, validatorGetItem, deleteItem);

module.exports = router;
