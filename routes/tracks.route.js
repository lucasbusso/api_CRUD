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
} = require("../validators/track");
const authMiddleware = require("../middlewares/session");
const checkRole = require("../middlewares/userRole");

const router = express.Router();

router.get("/", authMiddleware, getItems);
router.get("/:id", authMiddleware, validatorGetItem, getItem);
router.post(
  "/",
  authMiddleware,
  checkRole(["admin"]),
  validatorCreateItem,
  createItem
);
router.put(
  "/:id",
  authMiddleware,
  validatorGetItem,
  validatorCreateItem,
  updateItem
);
router.delete("/:id", authMiddleware, validatorGetItem, deleteItem);

module.exports = router;
