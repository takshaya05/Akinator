require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const gameRoutes = require("./routes/gameRoutes");
const characterRoutes = require("./routes/characterRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://akinator-frontend.vercel.app",
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
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

app.use((err, req, res, next) => {
  console.error("API error:", err.message);

  res.status(500).json({
    success: false,
    message: "Internal server error.",
  });
});

async function startServer() {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  startServer();
}

module.exports = app;