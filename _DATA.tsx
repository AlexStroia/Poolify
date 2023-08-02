type UserId = string;
type QuestionId = string;
export type Answer = "optionOne" | "optionTwo";

interface User {
  id: UserId;
  password: string;
  name: string;
  avatarURL: null | string;
  answers: Record<QuestionId, Answer>;
  questions: QuestionId[];
}

interface QuestionOption {
  votes: UserId[];
  text: string;
}

interface Question {
  id: QuestionId;
  author: UserId;
  timestamp: number;
  optionOne: QuestionOption;
  optionTwo: QuestionOption;
}

interface UsersData {
  [userId: string]: User;
}

interface QuestionsData {
  [questionId: string]: Question;
}

let users: UsersData = {
  sarahedo: {
    id: "sarahedo",
    password: "password123",
    name: "Sarah Edo",
    avatarURL: null,
    answers: {
      "8xf0y6ziyjabvozdd253nd": "optionOne",
      "6ni6ok3ym7mf1p33lnez": "optionOne",
      am8ehyc8byjqgar0jgpub9: "optionTwo",
      loxhs1bqm25b708cmbf3g: "optionTwo",
    },
    questions: ["8xf0y6ziyjabvozdd253nd", "am8ehyc8byjqgar0jgpub9"],
  },
  tylermcginnis: {
    id: "tylermcginnis",
    password: "abc321",
    name: "Tyler McGinnis",
    avatarURL: null,
    answers: {
      xj352vofupe1dqz9emx13r: "optionOne",
      vthrdm985a262al8qx3do: "optionTwo",
      "6ni6ok3ym7mf1p33lnez": "optionOne",
    },
    questions: ["loxhs1bqm25b708cmbf3g", "vthrdm985a262al8qx3do"],
  },
  mtsamis: {
    id: "mtsamis",
    password: "xyz123",
    name: "Mike Tsamis",
    avatarURL: null,
    answers: {
      xj352vofupe1dqz9emx13r: "optionOne",
      vthrdm985a262al8qx3do: "optionTwo",
      "6ni6ok3ym7mf1p33lnez": "optionOne",
    },
    questions: ["6ni6ok3ym7mf1p33lnez", "xj352vofupe1dqz9emx13r"],
  },
  zoshikanlu: {
    id: "zoshikanlu",
    password: "pass246",
    name: "Zenobia Oshikanlu",
    avatarURL: null,
    answers: {
      xj352vofupe1dqz9emx13r: "optionOne",
      vthrdm985a262al8qx3do: "optionTwo",
      "6ni6ok3ym7mf1p33lnez": "optionOne",
    },
    questions: [],
  },
};

let questions: QuestionsData = {
  "8xf0y6ziyjabvozdd253nd": {
    id: "8xf0y6ziyjabvozdd253nd",
    author: "sarahedo",
    timestamp: 1467166872634,
    optionOne: {
      votes: ["sarahedo"],
      text: "Build our new application with Javascript",
    },
    optionTwo: {
      votes: [],
      text: "Build our new application with Typescript",
    },
  },
  "6ni6ok3ym7mf1p33lnez": {
    id: "6ni6ok3ym7mf1p33lnez",
    author: "mtsamis",
    timestamp: 1468479767190,
    optionOne: {
      votes: [],
      text: "hire more frontend developers",
    },
    optionTwo: {
      votes: ["mtsamis", "sarahedo"],
      text: "hire more backend developers",
    },
  },
  am8ehyc8byjqgar0jgpub9: {
    id: "am8ehyc8byjqgar0jgpub9",
    author: "sarahedo",
    timestamp: 1488579767190,
    optionOne: {
      votes: [],
      text: "conduct a release retrospective 1 week after a release",
    },
    optionTwo: {
      votes: ["sarahedo"],
      text: "conduct release retrospectives quarterly",
    },
  },
  loxhs1bqm25b708cmbf3g: {
    id: "loxhs1bqm25b708cmbf3g",
    author: "tylermcginnis",
    timestamp: 1482579767190,
    optionOne: {
      votes: [],
      text: "have code reviews conducted by peers",
    },
    optionTwo: {
      votes: ["sarahedo"],
      text: "have code reviews conducted by managers",
    },
  },
  vthrdm985a262al8qx3do: {
    id: "vthrdm985a262al8qx3do",
    author: "tylermcginnis",
    timestamp: 1489579767190,
    optionOne: {
      votes: ["tylermcginnis"],
      text: "take a course on ReactJS",
    },
    optionTwo: {
      votes: ["mtsamis"],
      text: "take a course on unit testing with Jest",
    },
  },
  xj352vofupe1dqz9emx13r: {
    id: "xj352vofupe1dqz9emx13r",
    author: "mtsamis",
    timestamp: 1493579767190,
    optionOne: {
      votes: ["mtsamis", "zoshikanlu"],
      text: "deploy to production once every two weeks",
    },
    optionTwo: {
      votes: ["tylermcginnis"],
      text: "deploy to production once every month",
    },
  },
};

function generateUID(): string {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

export function _getUsers(): Promise<UsersData> {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ ...users }), 1000);
  });
}

export function _getQuestions(): Promise<QuestionsData> {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ ...questions }), 1000);
  });
}

function formatQuestion({
  optionOneText,
  optionTwoText,
  author,
}: {
  optionOneText: string;
  optionTwoText: string;
  author: UserId;
}): Question {
  return {
    id: generateUID(),
    timestamp: Date.now(),
    author,
    optionOne: {
      votes: [],
      text: optionOneText,
    },
    optionTwo: {
      votes: [],
      text: optionTwoText,
    },
  };
}

export function _saveQuestion(question: {
  optionOneText: string;
  optionTwoText: string;
  author: UserId;
}): Promise<Question> {
  return new Promise((resolve, reject) => {
    if (
      !question.optionOneText ||
      !question.optionTwoText ||
      !question.author
    ) {
      reject("Please provide optionOneText, optionTwoText, and author");
    }

    const formattedQuestion: Question = formatQuestion(question);
    setTimeout(() => {
      questions = {
        ...questions,
        [formattedQuestion.id]: formattedQuestion,
      };

      resolve(formattedQuestion);
    }, 1000);
  });
}

export function _saveQuestionAnswer({
  authedUser,
  qid,
  answer,
}: {
  authedUser: UserId;
  qid: QuestionId;
  answer: Answer;
}): Promise<boolean> {
  return new Promise((resolve, reject) => {
    if (!authedUser || !qid || !answer) {
      reject("Please provide authedUser, qid, and answer");
    }

    setTimeout(() => {
      users = {
        ...users,
        [authedUser]: {
          ...users[authedUser],
          answers: {
            ...users[authedUser].answers,
            [qid]: answer,
          },
        },
      };

      questions = {
        ...questions,
        [qid]: {
          ...questions[qid],
          [answer]: {
            ...questions[qid][answer],
            votes: questions[qid][answer].votes.concat([authedUser]),
          },
        },
      };

      resolve(true);
    }, 500);
  });
}

describe("_saveQuestion", () => {
  test("should return the saved question when correctly formatted data is passed", async () => {
    // Mock the necessary data
    const questionData = {
      optionOneText: "Option One Text",
      optionTwoText: "Option Two Text",
      author: "sarahedo",
    };

    // Call the _saveQuestion function and await the result
    const savedQuestion: Question = await _saveQuestion(questionData);

    // Verify that the saved question is returned and all expected fields are populated
    expect(savedQuestion.id).toBeTruthy();
    expect(savedQuestion.timestamp).toBeTruthy();
    expect(savedQuestion.author).toBe(questionData.author);
    expect(savedQuestion.optionOne.votes).toEqual([]);
    expect(savedQuestion.optionOne.text).toBe(questionData.optionOneText);
    expect(savedQuestion.optionTwo.votes).toEqual([]);
    expect(savedQuestion.optionTwo.text).toBe(questionData.optionTwoText);
  });

  test("should return an error when incorrect data is passed", async () => {
    // Mock the necessary data with incorrect data
    const questionData = {
      optionOneText: "Option One Text",
      optionTwoText: "",
      author: "",
    };

    try {
      // Call the _saveQuestion function with incorrect data
      await _saveQuestion(questionData);

      // If the function does not throw an error, fail the test
      fail("Expected _saveQuestion to throw an error, but it did not.");
    } catch (error) {
      // Verify that the error message is as expected
      expect(error).toBe(
        "Please provide optionOneText, optionTwoText, and author",
      );
    }
  });
});
