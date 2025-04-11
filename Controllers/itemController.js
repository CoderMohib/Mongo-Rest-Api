const Item = require("../Models/Item");

const creatItems = async (req, res) => {
  try {
    const newItem = new Item(req.body);
    await newItem.save();
    res
      .status(200)
      .json({ message: "Product Save Succesfully!", insertedId: newItem._id });
  } catch (err) {
    console.error("Insert failed:", err);
    res.status(500).json({ error: "Failed to insert data" });
  }
};

const getItem = async (req, res) => {
  try {
    const { sitem } = req.query;
    if (!sitem) {
      return res
        .status(400)
        .json({ message: "Item name is required in query" });
    }
    const item = await Item.findOne({ name: sitem });
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json({ message: "Item", data: item });
  } catch (err) {
    console.error("Error:", err);
    res
      .status(500)
      .json({ message: "An error occurred while retrieving data" });
  }
};
const updateItem = async (req, res) => {
  try {
    const filter = { name: req.params.item };
    const toUpdate = req.body;
    const result = await Item.updateOne(filter, { $set: toUpdate });
    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json({
      message: "Item updated successfully",
      modifiedCount: result.modifiedCount,
    });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ message: "Update failed", error: err });
  }
};
const deleteItem = async (req, res) => {
  try {
    const result = await Item.deleteOne({ name: req.params.item });

    if (result.deletedCount === 1) {
      res.status(200).json({ message: "Item deleted successfully" });
    } else {
      res.status(404).json({ message: "Item not found" });
    }
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getItem,
  creatItems,
  updateItem,
  deleteItem
};
