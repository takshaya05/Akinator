import { useEffect, useState } from "react";
import axios from "axios";
import { Check, RotateCcw, Sparkles, X } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "https://akinator-backend.onrender.com/api";

function Dashboard() {
  const [state, setState] = useState("idle");
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [count, setCount] = useState(null);
  const [guess, setGuess] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [characters, setCharacters] = useState([]);
  const [charactersLoading, setCharactersLoading] = useState(true);
  const [charactersError, setCharactersError] = useState("");

  useEffect(() => {
    axios
      .get(`${API_URL}/characters`)
      .then(({ data }) => {
        if (!data.success) throw new Error(data.message);
        setCharacters(data.characters || []);
      })
      .catch((err) =>
        setCharactersError(
          err.response?.data?.message || "Unable to load character list."
        )
      )
      .finally(() => setCharactersLoading(false));
  }, []);

  const reset = () => {
    setUsername("");
    setUsernameError("");
    setQuestions([]);
    setCurrent(0);
    setAnswers([]);
    setCount(null);
    setGuess(null);
    setResult(null);
    setError("");
  };

  const startGame = () => {
    reset();
    setState("username");
  };

  const submitUsername = async (e) => {
    e.preventDefault();
    const name = username.trim();

    if (!name) return setUsernameError("Please enter your username.");
    if (!/^[A-Za-z]+$/.test(name))
      return setUsernameError("Username must contain alphabets only.");

    try {
      setLoading(true);
      setError("");

      const { data } = await axios.post(`${API_URL}/game/start`, {
        username: name,
      });

      if (!data.success) throw new Error(data.message);

      setQuestions(data.question ? [data.question] : []);
      setCount(data.candidateCount ?? null);
      setGuess(data.guess ?? null);

      if (data.isFinished) setState("guess");
      else if (data.question) setState("playing");
      else setError("The server did not return a question.");
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to connect to the server."
      );
    } finally {
      setLoading(false);
    }
  };

  const answerQuestion = async (answer) => {
    const question = questions[current];
    if (loading || !question) return;

    const answerData = {
      questionId: question.id,
      questionKey: question.key,
      questionValue: question.value ?? null,
      answer,
    };
    const updated = [...answers, answerData];

    try {
      setLoading(true);
      setError("");

      const { data } = await axios.post(`${API_URL}/game/filter`, {
        answers: updated,
      });

      if (!data.success) throw new Error(data.message);

      if (data.inconsistentAnswers) {
        setError("No character matches these answers. Please restart.");
        return;
      }

      setAnswers(updated);
      setCount(data.candidateCount ?? null);

      if (data.isFinished) {
        setGuess(data.guess);
        setState("guess");
      } else if (data.question) {
        setQuestions((q) => [...q, data.question]);
        setCurrent((n) => n + 1);
      } else {
        setError("The server did not return the next question.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Unable to process your answer.");
    } finally {
      setLoading(false);
    }
  };

  const finishGuess = (correct) => {
    setResult(correct ? "correct" : "wrong");
    setState("result");
  };

  const restart = () => {
    reset();
    setState("idle");
  };

  const question = questions[current];
  const directChoice = ["type", "gender"].includes(question?.key);

  return (
    <section className="dashboard section" id="dashboard">
      <div className="section-container dashboard-container">
        <div className="section-heading dashboard-heading">
          <span className="section-label">GAME DASHBOARD</span>
          <h2>
            Ready to test Akinator?
          </h2>
          <p>Think of a character, answer the questions, and test your mind.</p>
        </div>

        <div className="game-card">
          {state === "idle" && (
            <div className="game-screen start-screen">
              <h3>Think of someone...</h3>
              <p>Choose a character and let Akinator try to guess it.</p>

              <div className="character-list-section">
                <div className="character-list-header">
                  <span>CURRENT DATABASE</span>
                  {!charactersLoading && characters.length > 0 && (
                    <strong>{characters.length} Characters</strong>
                  )}
                </div>

                {charactersLoading ? (
                  <div className="character-list-loading">
                    Loading characters...
                  </div>
                ) : charactersError ? (
                  <div className="character-list-error">{charactersError}</div>
                ) : characters.length ? (
                  <div className="character-list">
                    {characters.map((c, i) => (
                      <div className="character-name" key={c.name || i}>
                        {c.name}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="character-list-loading">
                    No characters found.
                  </div>
                )}
              </div>

              <button className="game-start-button" onClick={startGame}>
                <Sparkles size={18} /> Start Game
              </button>
            </div>
          )}

          {state === "username" && (
            <div className="game-screen">
              <h3>Enter your username</h3>
              <p>Enter your name before the game starts.</p>

              <form className="username-form" onSubmit={submitUsername}>
                <label htmlFor="username">Username</label>
                <input
                  id="username"
                  value={username}
                  maxLength={20}
                  placeholder="Enter your username"
                  autoComplete="off"
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setUsernameError("");
                    setError("");
                  }}
                />

                {usernameError && (
                  <span className="input-error">{usernameError}</span>
                )}
                {error && <span className="input-error">{error}</span>}

                <button
                  className="game-start-button"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Connecting..." : "Continue"}
                </button>
              </form>
            </div>
          )}

          {state === "playing" && question && (
            <div className="game-screen">
              <div className="game-progress">
                <span>QUESTION {current + 1}</span>
                <span>{current + 1}</span>
              </div>

              <div className="question-progress-bar">
                <div style={{ width: `${Math.min(((current + 1) / 5) * 100, 100)}%` }} />
              </div>

              <h3>{question.text}</h3>
              <p>
                {directChoice
                  ? "Choose the option that matches your character."
                  : "Answer to narrow down the possibilities."}
              </p>

              <div className="answer-buttons">
                {directChoice
                  ? question.options?.map((option) => (
                      <button
                        className="answer-button choice-button"
                        key={option.value}
                        onClick={() => answerQuestion(option.value)}
                        disabled={loading}
                      >
                        {loading ? "Thinking..." : option.label}
                      </button>
                    ))
                  : (
                    <>
                      <button
                        className="answer-button yes-button"
                        onClick={() => answerQuestion(true)}
                        disabled={loading}
                      >
                        <Check size={22} /> {loading ? "Thinking..." : "Yes"}
                      </button>
                      <button
                        className="answer-button no-button"
                        onClick={() => answerQuestion(false)}
                        disabled={loading}
                      >
                        <X size={22} /> {loading ? "Thinking..." : "No"}
                      </button>
                    </>
                  )}
              </div>

              {count !== null && (
                <div className="candidate-info">
                  <span>Possible characters:</span>
                  <strong>{count}</strong>
                </div>
              )}

              {error && <span className="input-error">{error}</span>}
            </div>
          )}

          {state === "guess" && (
            <div className="game-screen guess-screen">
              <h3>I think your character is</h3>
              <div className="guess-name">{guess?.name || "Unknown Character"}</div>

              {guess?.type && <p>Type: {guess.type}</p>}
              {guess?.gender && <p>Gender: {guess.gender}</p>}
              {guess?.category && <p>Category: {guess.category}</p>}
              {guess?.movie && <p>Movie: {guess.movie}</p>}

              <p>{username}, did I guess correctly?</p>

              <div className="answer-buttons">
                <button className="answer-button yes-button" onClick={() => finishGuess(true)}>
                  <Check size={22} /> Yes, Correct
                </button>
                <button className="answer-button no-button" onClick={() => finishGuess(false)}>
                  <X size={22} /> No, Wrong
                </button>
              </div>
            </div>
          )}

          {state === "result" && (
            <div className="game-screen result-screen">
              {result === "correct" ? (
                <>
                  <div className="success-icon"><Check size={40} /></div>
                  <h3>Got it!</h3>
                  <p>Akinator successfully guessed your character, <strong>{username}</strong>.</p>
                  <div className="celebration-message">🎉 Congratulations! 🎉</div>
                  <button className="game-start-button" onClick={restart}>
                    <RotateCcw size={18} /> Play Again
                  </button>
                </>
              ) : (
                <>
                  <div className="failure-icon"><X size={40} /></div>
                  <h3>Oops! I couldn't guess.</h3>
                  <p>Your character stayed one step ahead this time.</p>
                  <button className="game-start-button" onClick={restart}>
                    <RotateCcw size={18} /> Restart Game
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Dashboard;