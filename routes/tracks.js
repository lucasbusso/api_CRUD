const express = require("express");
const {
  getItems,
  getItem,
  createItem,
} = require("../controllers/tracks.controller");
const router = express.Router();

router.get("/", getItems);
router.get("/:id", getItem);
router.post("/", createItem);

module.exports = router;
