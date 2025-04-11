const express = require("express");
const router = express.Router();
const {
  getItem,
  creatItems,
  updateItem,
  deleteItem,
} = require("../Controllers/itemController");

router.post("/items", creatItems);
router.get("/items", getItem);
router.put("/items/:item",updateItem);
router.delete("/items/:item",deleteItem);
module.exports = router;
