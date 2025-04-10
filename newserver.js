
const express = require("express");
const connectDB = require("./db/connect");

const app = express();
const port = 3000;

app.use(express.json());

let db;

app.post("/items", async (req, res) => {
  try {
    const collection = db.collection("test");
    let data = req.body;
    const result = await collection.insertMany(data);

    res.status(201).json({
      message: "📦 Data inserted successfully",
      insertedId: result.insertedId,
    });
  } catch (error) {
    console.error("Insert failed:", error);
    res.status(500).json({ error: "Failed to insert data" });
  }
});

app.get("/items", async (req, res) => {
  try {
    const collection = db.collection("test");
    const { sitem } = req.query;
    if (!sitem) {
      return res
        .status(400)
        .json({ message: "Item name is required in query" });
    }
    const item = await collection.find({ item: sitem }).toArray();
    if (!item.length) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json({ message: "Item", data: item });
  } catch (err) {
    console.error("Error:", err);
    res
      .status(500)
      .json({ message: "An error occurred while retrieving data" });
  }
});

app.put("/items/:item", async (req, res) => {
  try {
    const collection = db.collection("test");
    const filter = { item: req.params.item };
    const toUpdate = { $set: req.body };
    const result = await collection.updateOne(filter, toUpdate);
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
});

app.delete("/items/:item", async (req, res) => {
    const toDelete = { item: req.params.item };

  try {
    const result = await db
      .collection("test")
      .deleteOne(toDelete);

    if (result.deletedCount === 1) {
      res.status(200).send({ message: "Item deleted successfully" });
    } else {
      res.status(404).send({ message: "Item not found" });
    }
  } catch (error) {
    console.error("Error deleting Item:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});
connectDB()
  .then((database) => {
    db = database;
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to start the server:", error);
  });
