import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { MemoryRouter, Route, Routes } from "react-router-dom"; // For mocking navigation
import { HomeComponent } from "../src/components/HomeComponent";
import { QuestionData } from "../src/model/QuestionData";
import { DashboardPage } from "../src/state/DashboardState";
import thunk from "redux-thunk";
import * as router from "react-router";

const mockStore = configureStore([thunk]);
const mockedUsedNavigate = jest.fn();

// 2- Mock the library
jest.mock("react-router-dom", () => ({

// 3- Import non-mocked library and use other functionalities and hooks
  ...(jest.requireActual("react-router-dom") as any),

// 4- Mock the required hook
  useNavigate: () => mockedUsedNavigate
}));

const sampleQuestions: QuestionData[] = [
  {
    date: "July 26, 2023 at 10:09:44 AM",
    questionOptionFirst: "Do you prefer tea or coffee?",
    questionOptionSecond: "What is your favorite color?",
    email: "john.doe@example.com",
    id: "1",
    voteOptionFirst: "10",
    voteOptionSecond: "15",
    userId: "user123",
  },
  {
    date: "July 26, 2023 at 10:09:34 AM",
    questionOptionFirst: "What is your favorite book?",
    questionOptionSecond: "Do you like hiking?",
    email: "jane.smith@example.com",
    id: "2",
    voteOptionFirst: "5",
    voteOptionSecond: "7",
    userId: "user456",
  },
  {
    date: "July 26, 2023 at 10:03:34 AM",
    questionOptionFirst: "Do you enjoy cooking?",
    questionOptionSecond: "What is your dream destination?",
    email: "sam.wilson@example.com",
    id: "3",
    voteOptionFirst: "12",
    voteOptionSecond: "8",
    userId: "user789",
  },
];

test("renders HomeComponent correctly", () => {
  // Create the mock store with the initial state
  const store = mockStore({
    authentication: {
      user: {
        userId: "mockUserId",
        email: "mockEmail",
        displayName: "mockDisplayName",
        questionsAnswered: [],
        questionsPut: [],
        avatarUrl: "avatarUrl",
      },
    },
    dashboard: {
      loading: false,
      loadingNewQuestions: false,
      loadingDoneQuestions: false,
      userNewQuestions: sampleQuestions,
      userAnsweredQuestions: sampleQuestions,
    },
  });

  // Render the component inside the Provider with the mock store and MemoryRouter for navigation mocking
  render(
    <Provider store={store}>
      <MemoryRouter>
        <HomeComponent />
      </MemoryRouter>
    </Provider>
  );

  // Expect the QuestionList with questionListType "NEW" to be in the document
  const questionListNew = screen.getByTestId("questions-list-new");
  expect(questionListNew).toBeInTheDocument;

  // Expect the QuestionList with questionListType "DONE" to be in the document
  const questionListDone = screen.getByTestId("questions-list-done");
  expect(questionListDone).toBeInTheDocument;
});

const navigate = jest.fn();

beforeEach(() => {
  jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
});

test("navigates to question details page on tapping a question", () => {
  // Create the mock store with the mock state

  const store = mockStore({
    authentication: {
      user: {
        userId: "mockUserId",
        email: "mockEmail",
        displayName: "mockDisplayName",
        questionsAnswered: [],
        questionsPut: [],
        avatarUrl: "avatarUrl",
      },
    },
    dashboard: {
      page: DashboardPage.HOME,
      loadingNewQuestions: false,
      loadingDoneQuestions: false,
      loading: false,
      errorMessage: null,
      allQuestions: sampleQuestions,
      userAnsweredQuestions: sampleQuestions,
      userNewQuestions: sampleQuestions,
      users: [],
    },
  });


  // Render the component inside the Provider with the mock store and MemoryRouter for navigation mocking
  render(
    <Provider store={store}>
      <MemoryRouter>
        <HomeComponent />
      </MemoryRouter>
    </Provider>
  );

  expect(
    screen.getByTestId("questions-list-new").children.length
  ).toBeGreaterThan(0);
  // Simulate clicking on a question in the "NEW" question list
  const firstNewQuestion = screen.getByTestId("questions-list-new");
  fireEvent.click(firstNewQuestion);

  // Expect the mockNavigate function to be called with the correct questionId
  expect(
    screen.getByTestId("questions-list-new").children.length
  ).toBeGreaterThan(0);
  expect(mockedUsedNavigate).toBeCalled
});
