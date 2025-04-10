// db.js
const { MongoClient } = require("mongodb");

const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);
const dbName = "Inventory";

async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    const db = client.db(dbName); 
    return db;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error("Failed to connect to MongoDB");
  }
}

module.exports = connectDB;
