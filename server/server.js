require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const gameRoutes = require("./routes/gameRoutes");
const characterRoutes = require("./routes/characterRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

connectDB();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "https://akinator-game-six.vercel.app",
    ],
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Akinator API is running.",
  });
});

app.use("/api/game", gameRoutes);

app.use("/api/characters", characterRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found.",
  });
});

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;