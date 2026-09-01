const { getNextQuestion } = require("../utils/gameQuestions");

const validateUsername = (username) => {
  return (
    typeof username === "string" &&
    /^[A-Za-z]+$/.test(username.trim())
  );
};

const startGame = async (req, res) => {
  try {
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({
        success: false,
        message: "Username is required.",
      });
    }

    if (!validateUsername(username)) {
      return res.status(400).json({
        success: false,
        message: "Username must contain alphabets only.",
      });
    }

    const game = await getNextQuestion([]);

    return res.status(200).json({
      success: true,
      username: username.trim(),
      question: game.question,
      candidateCount: game.candidateCount,
      candidates: game.candidates,
      isFinished: game.isFinished,
      guess: game.guess,
      inconsistentAnswers: game.inconsistentAnswers || false,
    });
  } catch (error) {
    console.error("Start game error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to start the game.",
    });
  }
};

const filterCharacters = async (req, res) => {
  try {
    const { answers = [] } = req.body;

    if (!Array.isArray(answers)) {
      return res.status(400).json({
        success: false,
        message: "Answers must be an array.",
      });
    }

    const game = await getNextQuestion(answers);

    return res.status(200).json({
      success: true,
      question: game.question,
      candidates: game.candidates,
      candidateCount: game.candidateCount,
      isFinished: game.isFinished,
      guess: game.guess,
      inconsistentAnswers: game.inconsistentAnswers || false,
      message: game.message || null,
    });
  } catch (error) {
    console.error("Filter characters error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to filter characters.",
    });
  }
};

module.exports = {
  startGame,
  filterCharacters,
};