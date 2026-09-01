const Character = require("../models/Character");

const getCharacters = async (req, res) => {
  try {
    const characters = await Character.find()
      .select("name type category movie gender traits")
      .lean();

    return res.status(200).json({
      success: true,
      count: characters.length,
      characters,
    });
  } catch (error) {
    console.error("Get characters error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch characters.",
    });
  }
};

const getCharacterCount = async (req, res) => {
  try {
    const count = await Character.countDocuments();

    return res.status(200).json({
      success: true,
      count,
    });
  } catch (error) {
    console.error("Character count error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to get character count.",
    });
  }
};

module.exports = {
  getCharacters,
  getCharacterCount,
};
