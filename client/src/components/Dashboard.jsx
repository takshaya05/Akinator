import { useEffect, useState } from "react";
import axios from "axios";
import {
  Brain,
  Check,
  RotateCcw,
  Sparkles,
  X,
} from "lucide-react";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

function Dashboard() {
  const [gameState, setGameState] = useState("idle");
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [candidateCount, setCandidateCount] = useState(null);
  const [guess, setGuess] = useState(null);
  const [result, setResult] = useState(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [characters, setCharacters] = useState([]);
  const [charactersLoading, setCharactersLoading] =
    useState(true);
  const [charactersError, setCharactersError] =
    useState("");

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setCharactersLoading(true);
        setCharactersError("");

        const response = await axios.get(
          `${API_URL}/characters`
        );

        if (!response.data.success) {
          throw new Error(
            response.data.message ||
              "Unable to fetch characters."
          );
        }

        setCharacters(
          response.data.characters || []
        );
      } catch (error) {
        console.error(error);

        setCharactersError(
          error.response?.data?.message ||
            "Unable to load character list."
        );
      } finally {
        setCharactersLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  const resetGame = () => {
    setUsername("");
    setUsernameError("");
    setQuestions([]);
    setCurrentQuestion(0);
    setAnswers([]);
    setCandidateCount(null);
    setGuess(null);
    setResult(null);
    setShowCelebration(false);
    setError("");
  };

  const startGame = () => {
    resetGame();
    setGameState("username");
  };

  const validateUsername = () => {
    const value = username.trim();

    if (!value) {
      setUsernameError(
        "Please enter your username."
      );
      return false;
    }

    if (!/^[A-Za-z]+$/.test(value)) {
      setUsernameError(
        "Username must contain alphabets only. No numbers or symbols."
      );
      return false;
    }

    setUsernameError("");
    return true;
  };

  const submitUsername = async (event) => {
    event.preventDefault();

    if (!validateUsername()) {
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await axios.post(
        `${API_URL}/game/start`,
        {
          username: username.trim(),
        }
      );

      if (!response.data.success) {
        throw new Error(
          response.data.message ||
            "Unable to start game."
        );
      }

      setQuestions(
        response.data.question
          ? [response.data.question]
          : []
      );

      setCurrentQuestion(0);
      setAnswers([]);

      setCandidateCount(
        response.data.candidateCount ?? null
      );

      setGuess(
        response.data.guess ?? null
      );

      if (response.data.isFinished) {
        setGameState("guess");
      } else if (response.data.question) {
        setGameState("playing");
      } else {
        setError(
          "The server did not return a question."
        );
      }
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Unable to connect to the Akinator server."
      );
    } finally {
      setLoading(false);
    }
  };

  const answerQuestion = async (answer) => {
    if (
      loading ||
      !questions[currentQuestion]
    ) {
      return;
    }

    const question =
      questions[currentQuestion];

    const answerData = {
      questionId: question.id,
      questionKey: question.key,
      questionValue:
        question.value ?? null,
      answer,
    };

    const updatedAnswers = [
      ...answers,
      answerData,
    ];

    try {
      setLoading(true);
      setError("");

      const response = await axios.post(
        `${API_URL}/game/filter`,
        {
          answers: updatedAnswers,
        }
      );

      if (!response.data.success) {
        throw new Error(
          response.data.message ||
            "Unable to process answer."
        );
      }

      if (
        response.data.inconsistentAnswers
      ) {
        setError(
          "No character matches these answers. Please restart the game."
        );
        return;
      }

      setAnswers(updatedAnswers);

      setCandidateCount(
        response.data.candidateCount ?? null
      );

      if (response.data.isFinished) {
        setGuess(
          response.data.guess
        );
        setGameState("guess");
        return;
      }

      if (response.data.question) {
        setQuestions((previous) => [
          ...previous,
          response.data.question,
        ]);

        setCurrentQuestion(
          (previous) => previous + 1
        );
      } else {
        setError(
          "The server did not return the next question."
        );
      }
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Unable to process your answer."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGuessResult = (
    isCorrect
  ) => {
    if (isCorrect) {
      setResult("correct");
      setShowCelebration(true);
      setGameState("result");

      setTimeout(() => {
        setShowCelebration(false);
      }, 4500);
    } else {
      setResult("wrong");
      setGameState("result");
    }
  };

  const restartGame = () => {
    resetGame();
    setGameState("idle");
  };

  const currentQuestionData =
    questions[currentQuestion];

  const isDirectChoiceQuestion =
    currentQuestionData?.key === "type" ||
    currentQuestionData?.key === "gender";

  return (
    <section
      className="dashboard section"
      id="dashboard"
    >
      <div className="dashboard-glow"></div>

      <div className="section-container dashboard-container">
        <div className="section-heading dashboard-heading">
          <span className="section-label">
            GAME DASHBOARD
          </span>

          <h2>
            Ready to test
            <span> Akinator?</span>
          </h2>

          <p>
            Think of a character, answer the
            questions, and see whether Akinator
            can read your mind.
          </p>
        </div>

        <div className="game-card">

          {gameState === "idle" && (
            <div className="game-screen start-screen">
              <div className="game-icon">
                <Brain size={38} />
              </div>

              <span className="game-status">
                SYSTEM READY
              </span>

              <h3>
                Think of someone...
              </h3>

              <p>
                Keep a character in your mind
                and let Akinator try to figure
                out who it is.
              </p>

              <div className="character-list-section">
                <div className="character-list-header">
                  <span>
                    CURRENT DATABASE
                  </span>

                  {!charactersLoading &&
                    characters.length > 0 && (
                      <strong>
                        {characters.length} Characters
                      </strong>
                    )}
                </div>

                <p className="character-list-description">
                  Our current database has these
                  characters. More characters will
                  be updated soon.
                </p>

                {charactersLoading ? (
                  <div className="character-list-loading">
                    Loading characters...
                  </div>
                ) : charactersError ? (
                  <div className="character-list-error">
                    {charactersError}
                  </div>
                ) : characters.length > 0 ? (
                  <div className="character-list">
                    {characters.map(
                      (character, index) => (
                        <div
                          className="character-name"
                          key={
                            character.name ||
                            index
                          }
                        >
                          {character.name}
                        </div>
                      )
                    )}
                  </div>
                ) : (
                  <div className="character-list-loading">
                    No characters found.
                  </div>
                )}
              </div>

              <button
                className="game-start-button"
                onClick={startGame}
              >
                <Sparkles size={18} />
                Start Game
              </button>
            </div>
          )}

          {gameState === "username" && (
            <div className="game-screen">
              <div className="game-progress">
                <span>
                  GAME SETUP
                </span>

                <span>
                  1 / 1
                </span>
              </div>

              <div className="game-question-icon">
                <Brain size={30} />
              </div>

              <span className="game-status">
                PLAYER IDENTIFICATION
              </span>

              <h3>
                What should we call you?
              </h3>

              <p>
                Enter your username before we
                start reading your mind.
              </p>

              <form
                className="username-form"
                onSubmit={submitUsername}
              >
                <label htmlFor="username">
                  Username
                </label>

                <input
                  id="username"
                  type="text"
                  value={username}
                  maxLength={20}
                  placeholder="Enter your username"
                  autoComplete="off"
                  onChange={(event) => {
                    setUsername(
                      event.target.value
                    );
                    setUsernameError("");
                    setError("");
                  }}
                />

                {usernameError && (
                  <span className="input-error">
                    {usernameError}
                  </span>
                )}

                {error && (
                  <span className="input-error">
                    {error}
                  </span>
                )}

                <button
                  type="submit"
                  className="game-start-button"
                  disabled={loading}
                >
                  {loading
                    ? "Connecting..."
                    : "Continue"}
                </button>
              </form>
            </div>
          )}

          {gameState === "playing" &&
            currentQuestionData && (
              <div className="game-screen">
                <div className="game-progress">
                  <span>
                    QUESTION{" "}
                    {currentQuestion + 1}
                  </span>

                  <span>
                    {currentQuestion + 1}
                  </span>
                </div>

                <div className="question-progress-bar">
                  <div
                    style={{
                      width: `${Math.min(
                        ((currentQuestion + 1) /
                          5) *
                          100,
                        100
                      )}%`,
                    }}
                  ></div>
                </div>

                <div className="game-question-icon">
                  <Brain size={30} />
                </div>

                <span className="game-status">
                  AKINATOR IS THINKING
                </span>

                <h3>
                  {currentQuestionData.text}
                </h3>

                <p>
                  {isDirectChoiceQuestion
                    ? "Choose the option that matches your character."
                    : "Answer the question to narrow down the possibilities."}
                </p>

                {isDirectChoiceQuestion ? (
                  <div className="answer-buttons">
                    {currentQuestionData.options?.map(
                      (option) => (
                        <button
                          key={option.value}
                          className="answer-button choice-button"
                          onClick={() =>
                            answerQuestion(
                              option.value
                            )
                          }
                          disabled={loading}
                        >
                          {loading
                            ? "Thinking..."
                            : option.label}
                        </button>
                      )
                    )}
                  </div>
                ) : (
                  <div className="answer-buttons">
                    <button
                      className="answer-button yes-button"
                      onClick={() =>
                        answerQuestion(true)
                      }
                      disabled={loading}
                    >
                      <Check size={22} />
                      {loading
                        ? "Thinking..."
                        : "Yes"}
                    </button>

                    <button
                      className="answer-button no-button"
                      onClick={() =>
                        answerQuestion(false)
                      }
                      disabled={loading}
                    >
                      <X size={22} />
                      {loading
                        ? "Thinking..."
                        : "No"}
                    </button>
                  </div>
                )}

                {candidateCount !== null && (
                  <div className="candidate-info">
                    <span>
                      Possible characters:
                    </span>

                    <strong>
                      {candidateCount}
                    </strong>
                  </div>
                )}

                {error && (
                  <span className="input-error">
                    {error}
                  </span>
                )}
              </div>
            )}

          {gameState === "guess" && (
            <div className="game-screen guess-screen">
              <div className="guess-sparkle">
                <Sparkles size={32} />
              </div>

              <span className="game-status">
                MY GUESS
              </span>

              <h3>
                I think your character is
              </h3>

              <div className="guess-name">
                {guess?.name ||
                  "Unknown Character"}
              </div>

              {guess?.type && (
                <p>
                  Type: {guess.type}
                </p>
              )}

              {guess?.gender && (
                <p>
                  Gender: {guess.gender}
                </p>
              )}

              {guess?.category && (
                <p>
                  Category:{" "}
                  {guess.category}
                </p>
              )}

              {guess?.movie && (
                <p>
                  Movie: {guess.movie}
                </p>
              )}

              <p className="guess-description">
                {username}, did I read your
                mind correctly?
              </p>

              <div className="answer-buttons">
                <button
                  className="answer-button yes-button"
                  onClick={() =>
                    handleGuessResult(true)
                  }
                >
                  <Check size={22} />
                  Yes, Correct
                </button>

                <button
                  className="answer-button no-button"
                  onClick={() =>
                    handleGuessResult(false)
                  }
                >
                  <X size={22} />
                  No, Wrong
                </button>
              </div>
            </div>
          )}

          {gameState === "result" && (
            <div className="game-screen result-screen">
              {result === "correct" ? (
                <>
                  <div className="success-icon">
                    <Check size={40} />
                  </div>

                  <span className="game-status success-status">
                    MIND READING SUCCESSFUL
                  </span>

                  <h3>
                    Got it!
                  </h3>

                  <p>
                    Akinator successfully
                    guessed your character,{" "}
                    <strong>
                      {username}
                    </strong>
                    .
                  </p>

                  <div className="celebration-message">
                    🎉 Congratulations! 🎉
                  </div>

                  <button
                    className="game-start-button"
                    onClick={restartGame}
                  >
                    <RotateCcw size={18} />
                    Play Again
                  </button>
                </>
              ) : (
                <>
                  <div className="failure-icon">
                    <X size={40} />
                  </div>

                  <span className="game-status failure-status">
                    GUESS FAILED
                  </span>

                  <h3>
                    Oops! I couldn't guess.
                  </h3>

                  <p>
                    Looks like your character
                    managed to stay one step
                    ahead this time.
                  </p>

                  <button
                    className="game-start-button"
                    onClick={restartGame}
                  >
                    <RotateCcw size={18} />
                    Restart Game
                  </button>
                </>
              )}
            </div>
          )}

          {showCelebration && (
            <div className="celebration">
              {Array.from({
                length: 28,
              }).map((_, index) => (
                <span
                  className="confetti"
                  key={index}
                  style={{
                    left: `${
                      Math.random() * 100
                    }%`,
                    animationDelay: `${
                      Math.random() * 0.8
                    }s`,
                    animationDuration: `${
                      2 +
                      Math.random() * 2
                    }s`,
                  }}
                ></span>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Dashboard;