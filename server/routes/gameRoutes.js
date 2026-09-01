const express = require("express");

const {
  startGame,
  filterCharacters,
} = require("../controllers/gameController");

const router = express.Router();

router.post("/start", startGame);

router.post("/filter", filterCharacters);

module.exports = router;