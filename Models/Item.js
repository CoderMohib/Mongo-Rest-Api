const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  inStock: Boolean,
  quantity: Number,
  category: String,
});

const Item = mongoose.model("Items", itemSchema);
module.exports = Item;
