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
router.put("/items/:id",updateItem);
router.delete("/items/:id",deleteItem);
module.exports = router;
