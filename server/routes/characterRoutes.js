const express = require("express");

const Character = require("../models/Character");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const characters = await Character.find(
      {},
      {
        name: 1,
        _id: 0,
      }
    ).sort({
      name: 1,
    });

    res.status(200).json({
      success: true,
      count: characters.length,
      characters,
    });
  } catch (error) {
    console.error(
      "Error fetching characters:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Unable to fetch characters.",
    });
  }
});

module.exports = router;