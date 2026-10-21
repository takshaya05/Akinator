const Character = require("../models/Character");

const FIELD_ORDER = [
  "type",
  "gender",
  "category",
  "speciality",
  "movie",
];

const CHARACTER_FIELDS = [
  "name",
  "type",
  "category",
  "movie",
  "gender",
  "speciality",
];

const SMALL_CANDIDATE_LIMIT = 3;

const normalize = (value) => {
  if (typeof value !== "string") return "";
  return value.trim().toLowerCase();
};

const getFieldValue = (character, field) =>
  character?.[field] ?? "";

const getUniqueValues = (characters, field) => {
  const values = new Map();

  characters.forEach((character) => {
    const value = getFieldValue(character, field);

    if (typeof value !== "string" || !value.trim()) return;

    const normalized = normalize(value);

    if (!values.has(normalized)) {
      values.set(normalized, value.trim());
    }
  });

  return [...values.values()];
};

const createQuestion = (field, value = null) => {
  const normalizedValue = normalize(value);

  const id =
    field === "type" || field === "gender"
      ? field
      : `${field}:${normalizedValue}`;

  const templates = {
    type: "Are you thinking of a real person or a fictional character?",
    gender: "What is the character's gender?",
    category: `Is the character associated with ${value}?`,
    speciality: `Is the character known for ${value}?`,
    movie: `Is the character associated with the movie ${value}?`,
  };

  const isChoice = field === "type" || field === "gender";

  const options =
    field === "type"
      ? ["real", "fictional"]
      : field === "gender"
        ? ["male", "female"]
        : ["yes", "no"];

  const question = {
    id,
    questionId: id,
    key: field,
    questionKey: field,
    type: isChoice ? "choice" : "boolean",
    question: templates[field],
    text: templates[field],
    options,
  };

  if (value !== null && value !== undefined) {
    question.value = value;
    question.questionValue = value;
  }

  return question;
};

const parseBoolean = (value) => {
  if (typeof value === "boolean") return value;
  if (typeof value !== "string") return null;

  const normalized = normalize(value);

  if (["yes", "y", "true"].includes(normalized)) return true;
  if (["no", "n", "false"].includes(normalized)) return false;

  return null;
};

const getQuestionFromAnswer = (answer) => {
  if (!answer || typeof answer !== "object" || Array.isArray(answer)) {
    return null;
  }

  const questionId = answer.questionId || answer.id || "";

  let field = answer.questionKey || answer.key || "";

  let value =
    answer.questionValue !== undefined
      ? answer.questionValue
      : answer.value;

  if (!field && typeof questionId === "string") {
    const separatorIndex = questionId.indexOf(":");

    if (separatorIndex === -1) {
      field = questionId;
    } else {
      field = questionId.slice(0, separatorIndex);

      if (value === undefined) {
        value = questionId.slice(separatorIndex + 1);
      }
    }
  }

  if (!FIELD_ORDER.includes(field)) return null;

  const answerValue = answer.answer;

  if (field === "type" || field === "gender") {
    if (typeof answerValue !== "string") return null;

    const normalized = normalize(answerValue);

    if (
      field === "type" &&
      !["real", "fictional"].includes(normalized)
    ) {
      return null;
    }

    if (
      field === "gender" &&
      !["male", "female"].includes(normalized)
    ) {
      return null;
    }

    return {
      id: field,
      key: field,
      type: "choice",
      value: normalized,
      answer: normalized,
    };
  }

  if (typeof value !== "string" || !value.trim()) {
    return null;
  }

  const booleanAnswer = parseBoolean(answerValue);

  if (booleanAnswer === null) return null;

  return {
    id: `${field}:${normalize(value)}`,
    key: field,
    type: "boolean",
    value: value.trim(),
    answer: booleanAnswer,
  };
};

const matchesAnswer = (character, answer) => {
  const characterValue = normalize(
    String(getFieldValue(character, answer.key))
  );

  if (answer.key === "type" || answer.key === "gender") {
    return characterValue === normalize(answer.value);
  }

  const matchesValue = characterValue === normalize(answer.value);

  return answer.answer ? matchesValue : !matchesValue;
};

const filterCandidates = (characters, answers = []) => {
  if (!Array.isArray(characters) || !Array.isArray(answers)) {
    return [];
  }

  const parsedAnswers = answers
    .map(getQuestionFromAnswer)
    .filter(Boolean);

  return characters.filter((character) =>
    parsedAnswers.every((answer) => matchesAnswer(character, answer))
  );
};

const getAnsweredQuestionIds = (answers = []) =>
  new Set(
    answers
      .map(getQuestionFromAnswer)
      .filter(Boolean)
      .map((answer) => answer.id)
  );

const getAnsweredFields = (answers = []) =>
  new Set(
    answers
      .map(getQuestionFromAnswer)
      .filter(Boolean)
      .map((answer) => answer.key)
  );

const getAnsweredQuestionCount = (answers = []) =>
  answers.map(getQuestionFromAnswer).filter(Boolean).length;

const getQuestionCandidates = (
  characters,
  answeredQuestionIds = new Set()
) => {
  const questions = [];

  ["category", "movie", "speciality"].forEach((field) => {
    getUniqueValues(characters, field).forEach((value) => {
      const question = createQuestion(field, value);

      if (!answeredQuestionIds.has(question.id)) {
        questions.push(question);
      }
    });
  });

  return questions;
};

const calculateQuestionScore = (characters, question) => {
  if (!Array.isArray(characters) || characters.length < 2) {
    return -1;
  }

  const yesCount = characters.filter(
    (character) =>
      normalize(String(getFieldValue(character, question.key))) ===
      normalize(question.value)
  ).length;

  const noCount = characters.length - yesCount;

  if (yesCount === 0 || noCount === 0) return -1;

  return 1 - Math.abs(yesCount - noCount) / characters.length;
};

const getBestQuestion = (characters, questions) => {
  let bestQuestion = null;
  let bestScore = -1;

  questions.forEach((question) => {
    const score = calculateQuestionScore(characters, question);

    if (score > bestScore) {
      bestScore = score;
      bestQuestion = question;
    }
  });

  return bestQuestion;
};

const getCandidateSummary = (character) => ({
  name: character.name,
  type: character.type,
  category: character.category,
  movie: character.movie,
  gender: character.gender,
  speciality: character.speciality,
});

const createResponse = ({
  question = null,
  candidates = [],
  isFinished = false,
  guess = null,
  inconsistentAnswers = false,
  message = null,
}) => {
  const response = {
    question,
    candidates: candidates.map(getCandidateSummary),
    candidateCount: candidates.length,
    isFinished,
    guess: guess ? getCandidateSummary(guess) : null,
    inconsistentAnswers,
  };

  if (message) response.message = message;

  return response;
};

const getNextQuestion = async (answers = []) => {
  if (!Array.isArray(answers)) {
    throw new Error("Answers must be an array.");
  }

  const characters = await Character.find()
    .select(CHARACTER_FIELDS.join(" "))
    .lean();

  if (!characters.length) {
    return createResponse({
      isFinished: true,
      message: "No characters are available in the database.",
    });
  }

  const validAnswers = answers
    .map(getQuestionFromAnswer)
    .filter(Boolean);

  const candidates = filterCandidates(characters, validAnswers);

  if (!candidates.length) {
    return createResponse({
      isFinished: true,
      inconsistentAnswers: true,
      message:
        "No character matches the selected answers. Please review your answers or restart the game.",
    });
  }

  if (candidates.length === 1) {
    return createResponse({
      candidates,
      isFinished: true,
      guess: candidates[0],
      message: `I think your character is ${candidates[0].name}!`,
    });
  }

  const answeredQuestionIds = getAnsweredQuestionIds(validAnswers);
  const answeredFields = getAnsweredFields(validAnswers);

  if (!answeredFields.has("type")) {
    if (getUniqueValues(candidates, "type").length > 1) {
      return createResponse({
        question: createQuestion("type"),
        candidates,
      });
    }
  }

  if (!answeredFields.has("gender")) {
    if (getUniqueValues(candidates, "gender").length > 1) {
      return createResponse({
        question: createQuestion("gender"),
        candidates,
      });
    }
  }

  const questions = getQuestionCandidates(
    candidates,
    answeredQuestionIds
  );

  const question = getBestQuestion(candidates, questions);

  if (question) {
    return createResponse({ question, candidates });
  }

  return createResponse({
    candidates,
    isFinished: false,
    message:
      candidates.length <= SMALL_CANDIDATE_LIMIT
        ? "I narrowed it down to a few characters, but the available questions cannot distinguish them further."
        : "More distinguishing character data is needed.",
  });
};

const createQuestions = (characters) => {
  if (!Array.isArray(characters)) return [];

  const questions = [];

  ["type", "gender"].forEach((field) => {
    if (getUniqueValues(characters, field).length > 1) {
      questions.push(createQuestion(field));
    }
  });

  ["category", "movie", "speciality"].forEach((field) => {
    getUniqueValues(characters, field).forEach((value) => {
      questions.push(createQuestion(field, value));
    });
  });

  return questions;
};

const getGameQuestions = async () => {
  const characters = await Character.find()
    .select(CHARACTER_FIELDS.join(" "))
    .lean();

  return createQuestions(characters);
};

module.exports = {
  getGameQuestions,
  getNextQuestion,
  createQuestions,
  filterCandidates,
  createQuestion,
  getQuestionFromAnswer,
  getCandidateSummary,
  getAnsweredQuestionIds,
  getAnsweredFields,
  getAnsweredQuestionCount,
  calculateQuestionScore,
  getBestQuestion,
};