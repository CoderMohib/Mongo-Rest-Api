const express = require("express");
const connectDB = require("./db/connect");
const itemsRoutes = require("./Routes/itemsRoutes");
const App = express();
const PORT = 3000;

App.use(express.json());
App.use("/", itemsRoutes);
connectDB()
  .then(() => {
    App.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to start server:", err);
  });
