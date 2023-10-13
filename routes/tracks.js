const express = require("express");
const {
  getItems,
  getItem,
  createItem,
} = require("../controllers/tracks.controller");
const { validatorCreateItem } = require("../utils/validator/track");

const router = express.Router();

router.get("/", getItems);
router.get("/:id", getItem);
router.post("/", validatorCreateItem, createItem);

module.exports = router;
