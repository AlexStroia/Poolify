import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { MemoryRouter, Route, Routes } from "react-router-dom"; // For mocking navigation
import { HomeComponent } from "../src/components/HomeComponent";
import { QuestionData } from "../src/model/QuestionData";
import { QuestionComponent } from "../src/components/QuestionComponent";
import { DashboardPage } from "../src/state/DashboardState";

// Create a mock redux store using redux-mock-store
const mockStore = configureStore([]);
const sampleQuestions: QuestionData[] = [
  {
    date: "2023-07-28T12:00:00Z",
    questionOptionFirst: "Do you prefer tea or coffee?",
    questionOptionSecond: "What is your favorite color?",
    email: "john.doe@example.com",
    id: "1",
    voteOptionFirst: "10",
    voteOptionSecond: "15",
    userId: "user123",
  },
  {
    date: "2023-07-27T15:30:00Z",
    questionOptionFirst: "What is your favorite book?",
    questionOptionSecond: "Do you like hiking?",
    email: "jane.smith@example.com",
    id: "2",
    voteOptionFirst: "5",
    voteOptionSecond: "7",
    userId: "user456",
  },
  {
    date: "2023-07-26T09:45:00Z",
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

test("navigates to question details page on tapping a question", () => {
  // Mock the useNavigate function
  const mockNavigate = jest.fn();
  jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate,
  }));

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
      loading: false,
      page: DashboardPage.HOME,
      loadingNewQuestions: false,
      loadingDoneQuestions: false,
      userNewQuestions: sampleQuestions,
      userAnsweredQuestions: sampleQuestions,
      allQuestions: sampleQuestions,
      errorMessage: null,
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

  // Simulate clicking on a question in the "NEW" question list
  const firstNewQuestion = screen.getByTestId("questions-list-new").children[0];
  fireEvent.click(firstNewQuestion);

  // Expect the mockNavigate function to be called with the correct questionId
  expect(mockNavigate).toHaveBeenCalledWith("/questions/mockQuestionId"); // Replace 'mockQuestionId' with the actual questionId
});
