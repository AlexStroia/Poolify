import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store"; // If you are using redux-mock-store for testing
import { ForgotPasswordComponent } from "../src/components/ForgotPasswordComponent";

// Create a mock redux store using redux-mock-store
const mockStore = configureStore([]);

// Mock the onTapForgotPassword function
const mockOnTapForgotPassword = jest.fn();

// Mock the onClose function
const mockOnClose = jest.fn();

test("renders ForgotPasswordComponent correctly", () => {
  // Create the store with the initial state
  const store = mockStore({
    authentication: {
      errorMessage: null,
      loading: false,
      // Add other relevant properties from the state if needed
    },
  });

  // Render the component inside the Provider with the mock store
  render(
    <Provider store={store}>
      <ForgotPasswordComponent
        onTapForgotPassword={mockOnTapForgotPassword}
        onClose={mockOnClose}
      />
    </Provider>,
  );

  // Expect the Email input to be in the document
  const emailInput = screen.getByLabelText("Email");
  expect(emailInput).toBeInTheDocument;

  // Expect the Send Password button to be in the document
  const sendPasswordButton = screen.getByRole("button", {
    name: "Send Password",
  });
  expect(sendPasswordButton).toBeInTheDocument;
});

test("calls onTapForgotPassword function with correct email value", () => {
  // Create the store with the initial state
  const store = mockStore({
    authentication: {
      errorMessage: null,
      loading: false,
      // Add other relevant properties from the state if needed
    },
  });

  // Render the component inside the Provider with the mock store
  render(
    <Provider store={store}>
      <ForgotPasswordComponent
        onTapForgotPassword={mockOnTapForgotPassword}
        onClose={mockOnClose}
      />
    </Provider>,
  );

  // Get the Email input
  const emailInput = screen.getByLabelText("Email");

  // Type a test email into the Email input
  fireEvent.change(emailInput, { target: { value: "test@example.com" } });

  // Get the Send Password button
  const sendPasswordButton = screen.getByRole("button", {
    name: "Send Password",
  });

  // Click the Send Password button
  fireEvent.click(sendPasswordButton);

  // Expect the onTapForgotPassword function to be called with the correct email value
  expect(mockOnTapForgotPassword).toBeCalled;
});
