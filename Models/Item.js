const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    maxLength: [20, "Name must be at most 20 characters"],
    minLength: [2, "Name must be at least 3 characters"],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
    required: [true, "Description is required"],
  },
  price: {
    type: Number,
    min: [0, "Price Cannot be negative"],
  },
  inStock: {
    type: Boolean,
    default: function () {
      return this.quantity > 0;
    },
  },
  quantity: {
    type: Number,
    required: [true, "Quantity is required"],
    validate: {
      validator: function (v) {
        return typeof v === "number" && !isNaN(v) && Number.isInteger(v);
      },
      message: "Quantity must be a valid number",
    },
    min: [0, "Quantity cannot be negative"],
  },
  category: {
    type: String,
    required: [true, "Category is required"],
    maxLength: [15, "Category must be at most 15 characters"],
    minLength: [3, "Category must be at least 3 characters"],
    trim: true,
  },
});
itemSchema.pre(
  [
    "updateOne",
    "updateMany",
    "findOneAndUpdate",
    "findOneAndReplace",
    "replaceOne",
    "update",
  ],
  function (next) {
    this.setOptions({ runValidators: true });
    next();
  }
);
const Item = mongoose.model("Items", itemSchema);
module.exports = Item;
