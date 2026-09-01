const Character = require("../models/Character");

const FIELD_ORDER = [
  "type",
  "gender",
  "category",
  "traits",
  "movie"
];

const MAX_INITIAL_TRAIT_QUESTIONS = 2;
const SMALL_CANDIDATE_LIMIT = 3;

const normalize = (value) => {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().toLowerCase();
};

const getFieldValue = (character, field) => {
  if (field === "traits") {
    return Array.isArray(character.traits)
      ? character.traits
      : [];
  }

  return character[field] || "";
};

const getUniqueValues = (
  characters,
  field
) => {
  const values = new Map();

  for (const character of characters) {
    const currentValue =
      getFieldValue(
        character,
        field
      );

    if (field === "traits") {
      for (const trait of currentValue) {
        if (typeof trait !== "string") {
          continue;
        }

        const normalized =
          normalize(trait);

        if (!normalized) {
          continue;
        }

        if (!values.has(normalized)) {
          values.set(
            normalized,
            trait.trim()
          );
        }
      }
    } else {
      const normalized =
        normalize(currentValue);

      if (!normalized) {
        continue;
      }

      if (!values.has(normalized)) {
        values.set(
          normalized,
          String(currentValue).trim()
        );
      }
    }
  }

  return [...values.values()];
};

const createQuestion = (
  field,
  value
) => {
  if (field === "type") {
    return {
      id: "type",
      key: "type",
      type: "choice",
      text:
        "What type of character are you thinking of?",
      options: null
    };
  }

  if (field === "gender") {
    return {
      id: "gender",
      key: "gender",
      type: "choice",
      text:
        "What is the gender of your character?",
      options: null
    };
  }

  if (field === "category") {
    return {
      id:
        `category:${normalize(value)}`,
      key: "category",
      type: "boolean",
      value,
      text:
        `Is your character from ${value}?`
    };
  }

  if (field === "traits") {
    return {
      id:
        `traits:${normalize(value)}`,
      key: "traits",
      type: "boolean",
      value,
      text:
        `Does your character have the trait "${value}"?`
    };
  }

  if (field === "movie") {
    return {
      id:
        `movie:${normalize(value)}`,
      key: "movie",
      type: "boolean",
      value,
      text:
        `Is your character associated with the movie "${value}"?`
    };
  }

  return null;
};

const createChoiceQuestion = (
  field,
  candidates
) => {
  const values =
    getUniqueValues(
      candidates,
      field
    );

  if (values.length === 0) {
    return null;
  }

  return {
    id: field,
    key: field,
    type: "choice",
    text:
      field === "type"
        ? "What type of character are you thinking of?"
        : "What is the gender of your character?",
    options:
      values.map((value) => ({
        value,
        label:
          normalize(value) === "real"
            ? "Real"
            : normalize(value) === "fictional"
            ? "Fictional"
            : normalize(value) === "male"
            ? "Male"
            : normalize(value) === "female"
            ? "Female"
            : value
      }))
  };
};

const matchesExactValue = (
  character,
  field,
  value
) => {
  const target =
    normalize(value);

  const current =
    getFieldValue(
      character,
      field
    );

  if (field === "traits") {
    return current.some(
      (trait) =>
        normalize(trait) === target
    );
  }

  return (
    normalize(current) === target
  );
};

const parseBoolean = (
  value
) => {
  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value === "string") {
    const normalized =
      normalize(value);

    return (
      normalized === "true" ||
      normalized === "yes"
    );
  }

  return false;
};

const getQuestionFromAnswer = (
  answer
) => {
  if (
    !answer ||
    typeof answer !== "object"
  ) {
    return null;
  }

  if (
    answer.questionKey === "type" ||
    answer.questionId === "type"
  ) {
    return {
      id: "type",
      key: "type",
      type: "choice",
      value: answer.answer
    };
  }

  if (
    answer.questionKey === "gender" ||
    answer.questionId === "gender"
  ) {
    return {
      id: "gender",
      key: "gender",
      type: "choice",
      value: answer.answer
    };
  }

  if (
    answer.questionKey &&
    answer.questionValue !== undefined
  ) {
    return {
      id: answer.questionId,
      key: answer.questionKey,
      type: "boolean",
      value:
        answer.questionValue
    };
  }

  return null;
};

const filterCandidates = (
  characters,
  answers
) => {
  return characters.filter(
    (character) => {
      return answers.every(
        (answer) => {
          const question =
            getQuestionFromAnswer(
              answer
            );

          if (!question) {
            return true;
          }

          if (
            question.key === "type" ||
            question.key === "gender"
          ) {
            return matchesExactValue(
              character,
              question.key,
              question.value
            );
          }

          const matches =
            matchesExactValue(
              character,
              question.key,
              question.value
            );

          const userAnswer =
            parseBoolean(
              answer.answer
            );

          return (
            userAnswer ===
            matches
          );
        }
      );
    }
  );
};

const getAnsweredQuestionIds = (
  answers
) => {
  const ids = new Set();

  for (const answer of answers) {
    const question =
      getQuestionFromAnswer(
        answer
      );

    if (question) {
      ids.add(question.id);
    }
  }

  return ids;
};

const getAnsweredFields = (
  answers
) => {
  const fields = new Set();

  for (const answer of answers) {
    const question =
      getQuestionFromAnswer(
        answer
      );

    if (question) {
      fields.add(
        question.key
      );
    }
  }

  return fields;
};

const getAnsweredQuestionCount = (
  answers,
  field
) => {
  let count = 0;

  for (const answer of answers) {
    const question =
      getQuestionFromAnswer(
        answer
      );

    if (
      question &&
      question.key === field
    ) {
      count++;
    }
  }

  return count;
};

const getQuestionCandidates = (
  candidates,
  field,
  answeredQuestionIds
) => {
  const values =
    getUniqueValues(
      candidates,
      field
    );

  return values.filter(
    (value) => {
      let id;

      if (
        field === "category"
      ) {
        id =
          `category:${normalize(value)}`;
      } else if (
        field === "traits"
      ) {
        id =
          `traits:${normalize(value)}`;
      } else if (
        field === "movie"
      ) {
        id =
          `movie:${normalize(value)}`;
      } else {
        id = field;
      }

      return !answeredQuestionIds.has(
        id
      );
    }
  );
};

const calculateQuestionScore = (
  candidates,
  field,
  value
) => {
  if (
    candidates.length <= 1
  ) {
    return 0;
  }

  let yesCount = 0;
  let noCount = 0;

  for (const character of candidates) {
    if (
      matchesExactValue(
        character,
        field,
        value
      )
    ) {
      yesCount++;
    } else {
      noCount++;
    }
  }

  if (
    yesCount === 0 ||
    noCount === 0
  ) {
    return 0;
  }

  const total =
    candidates.length;

  const balance =
    Math.min(
      yesCount,
      noCount
    ) /
    Math.max(
      yesCount,
      noCount
    );

  const coverage =
    Math.min(
      yesCount,
      noCount
    ) /
    total;

  return (
    balance * 0.7 +
    coverage * 0.3
  );
};

const getBestQuestion = (
  candidates,
  answers,
  field
) => {
  const answeredQuestionIds =
    getAnsweredQuestionIds(
      answers
    );

  const values =
    getQuestionCandidates(
      candidates,
      field,
      answeredQuestionIds
    );

  let bestQuestion = null;
  let bestScore = 0;

  for (const value of values) {
    const score =
      calculateQuestionScore(
        candidates,
        field,
        value
      );

    if (
      score > bestScore
    ) {
      bestScore = score;

      bestQuestion =
        createQuestion(
          field,
          value
        );
    }
  }

  return bestQuestion;
};

const getCandidateSummary = (
  candidates
) => {
  return candidates.map(
    (character) => ({
      name: character.name,
      type: character.type,
      category:
        character.category,
      movie:
        character.movie,
      gender:
        character.gender,
      traits:
        character.traits
    })
  );
};

const createResponse = (
  question,
  candidates,
  isFinished = false,
  guess = null,
  inconsistentAnswers = false,
  message = undefined
) => {
  const response = {
    question,
    candidates:
      getCandidateSummary(
        candidates
      ),
    candidateCount:
      candidates.length,
    isFinished,
    guess,
    inconsistentAnswers
  };

  if (message) {
    response.message =
      message;
  }

  return response;
};

const getLastAnswerForField = (
  answers,
  field
) => {
  for (
    let i = answers.length - 1;
    i >= 0;
    i--
  ) {
    const question =
      getQuestionFromAnswer(
        answers[i]
      );

    if (
      question &&
      question.key === field
    ) {
      return answers[i];
    }
  }

  return null;
};

const wasLastAnswerNo = (
  answers,
  field
) => {
  const answer =
    getLastAnswerForField(
      answers,
      field
    );

  if (!answer) {
    return false;
  }

  return !parseBoolean(
    answer.answer
  );
};

const getNextQuestion = async (
  answers = []
) => {
  if (!Array.isArray(answers)) {
    throw new Error(
      "Answers must be an array."
    );
  }

  const characters =
    await Character.find()
      .select(
        "name type category movie gender traits"
      )
      .lean();

  if (
    characters.length === 0
  ) {
    return createResponse(
      null,
      [],
      true,
      null,
      false
    );
  }

  const candidates =
    filterCandidates(
      characters,
      answers
    );

  if (
    candidates.length === 0
  ) {
    return createResponse(
      null,
      [],
      false,
      null,
      true,
      "No character matches the selected answers."
    );
  }

  if (
    candidates.length === 1
  ) {
    return createResponse(
      null,
      candidates,
      true,
      candidates[0],
      false
    );
  }

  const answeredFields =
    getAnsweredFields(
      answers
    );

  if (
    !answeredFields.has("type")
  ) {
    const question =
      createChoiceQuestion(
        "type",
        candidates
      );

    return createResponse(
      question,
      candidates
    );
  }

  if (
    !answeredFields.has("gender")
  ) {
    const question =
      createChoiceQuestion(
        "gender",
        candidates
      );

    if (question) {
      return createResponse(
        question,
        candidates
      );
    }
  }

  const answeredQuestionIds =
    getAnsweredQuestionIds(
      answers
    );

  const remainingCategories =
    getQuestionCandidates(
      candidates,
      "category",
      answeredQuestionIds
    );

  if (
    remainingCategories.length > 0
  ) {
    const categoryQuestion =
      getBestQuestion(
        candidates,
        answers,
        "category"
      );

    if (categoryQuestion) {
      return createResponse(
        categoryQuestion,
        candidates
      );
    }
  }

  const traitCount =
    getAnsweredQuestionCount(
      answers,
      "traits"
    );

  const movieCount =
    getAnsweredQuestionCount(
      answers,
      "movie"
    );

  const lastMovieWasNo =
    wasLastAnswerNo(
      answers,
      "movie"
    );

  if (
    movieCount === 0
  ) {
    if (
      traitCount <
      MAX_INITIAL_TRAIT_QUESTIONS
    ) {
      const traitQuestion =
        getBestQuestion(
          candidates,
          answers,
          "traits"
        );

      if (
        traitQuestion
      ) {
        return createResponse(
          traitQuestion,
          candidates
        );
      }
    }

    const movieQuestion =
      getBestQuestion(
        candidates,
        answers,
        "movie"
      );

    if (movieQuestion) {
      return createResponse(
        movieQuestion,
        candidates
      );
    }

    if (
      candidates.length <=
      SMALL_CANDIDATE_LIMIT
    ) {
      return createResponse(
        null,
        candidates,
        true,
        candidates[0],
        false
      );
    }

    return createResponse(
      null,
      candidates,
      true,
      candidates[0],
      false
    );
  }

  if (
    movieCount > 0 &&
    lastMovieWasNo
  ) {
    const remainingTraits =
      getQuestionCandidates(
        candidates,
        "traits",
        answeredQuestionIds
      );

    if (
      remainingTraits.length > 0
    ) {
      const traitQuestion =
        getBestQuestion(
          candidates,
          answers,
          "traits"
        );

      if (
        traitQuestion
      ) {
        return createResponse(
          traitQuestion,
          candidates
        );
      }
    }

    const remainingMovies =
      getQuestionCandidates(
        candidates,
        "movie",
        answeredQuestionIds
      );

    if (
      remainingMovies.length > 0
    ) {
      const movieQuestion =
        getBestQuestion(
          candidates,
          answers,
          "movie"
        );

      if (movieQuestion) {
        return createResponse(
          movieQuestion,
          candidates
        );
      }
    }
  }

  if (
    candidates.length <=
    SMALL_CANDIDATE_LIMIT
  ) {
    return createResponse(
      null,
      candidates,
      true,
      candidates[0],
      false
    );
  }

  const remainingTraits =
    getQuestionCandidates(
      candidates,
      "traits",
      getAnsweredQuestionIds(
        answers
      )
    );

  if (
    remainingTraits.length > 0
  ) {
    const traitQuestion =
      getBestQuestion(
        candidates,
        answers,
        "traits"
      );

    if (traitQuestion) {
      return createResponse(
        traitQuestion,
        candidates
      );
    }
  }

  const remainingMovies =
    getQuestionCandidates(
      candidates,
      "movie",
      getAnsweredQuestionIds(
        answers
      )
    );

  if (
    remainingMovies.length > 0
  ) {
    const movieQuestion =
      getBestQuestion(
        candidates,
        answers,
        "movie"
      );

    if (movieQuestion) {
      return createResponse(
        movieQuestion,
        candidates
      );
    }
  }

  return createResponse(
    null,
    candidates,
    true,
    candidates[0],
    false
  );
};

const createQuestions = (
  characters
) => {
  const questions = [];

  for (
    const field of FIELD_ORDER
  ) {
    if (
      field === "type" ||
      field === "gender"
    ) {
      const question =
        createChoiceQuestion(
          field,
          characters
        );

      if (question) {
        questions.push(
          question
        );
      }

      continue;
    }

    const values =
      getUniqueValues(
        characters,
        field
      );

    for (
      const value of values
    ) {
      const question =
        createQuestion(
          field,
          value
        );

      if (question) {
        questions.push(
          question
        );
      }
    }
  }

  return questions;
};

const getGameQuestions =
  async () => {
    const characters =
      await Character.find()
        .select(
          "name type category movie gender traits"
        )
        .lean();

    return createQuestions(
      characters
    );
  };

module.exports = {
  getGameQuestions,
  getNextQuestion,
  createQuestions,
  filterCandidates
};