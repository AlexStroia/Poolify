import React from "react";
import { render, fireEvent, getByTestId } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import SignupComponent from "../src/components/SignupComponent";
import { MemoryRouter } from "react-router-dom";

const mockStore = configureStore([]);

describe("SignupComponent", () => {
  it("renders the login form correctly", () => {
    const store = mockStore({
      authentication: {
        user: {
          email: null,
          displayName: null,
        },
        loading: false,
        errorMessage: "",
        loggedOut: null,
      },
    });

    const { getByLabelText, getByText } = render(
      <MemoryRouter>
        <Provider store={store}>
          <SignupComponent />
        </Provider>
        Xp
      </MemoryRouter>
    );

    const emailInput = getByLabelText("Email");
    const passwordInput = getByLabelText("Password");
    const displayNameInput = getByLabelText("Display Name");
    expect(emailInput).toBeInTheDocument;
    expect(passwordInput).toBeInTheDocument;
    expect(displayNameInput).toBeInTheDocument;
    expect(getByText("Signup")).toBeInTheDocument;
    expect(getByText("Forgot Password")).toBeInTheDocument;
  });

  it("calls onTapSignUp function with correct email and password", () => {
    const store = mockStore({
      authentication: {
        user: {
          email: null,
          displayName: null,
        },
        loading: false,
        errorMessage: "",
        loggedOut: null,
      },
    });

    const onTapSignUpMock = jest.fn();

    const { getByLabelText, getByText, getByTestId } = render(
      <Provider store={store}>
        <SignupComponent onTapSignUp={onTapSignUpMock} />
      </Provider>
    );

    const emailInput = getByLabelText("Email");
    const passwordInput = getByLabelText("Password");
    const displayInput = getByLabelText("Display Name");
    const inputElement = getByTestId("input-id")
    const signupButton = getByText("Signup");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.change(displayInput, { target: { value: "Test" } });
    console.log(displayInput);
    fireEvent.change(inputElement, {
      target: {
        files: [new File([], "test-image.jpg", { type: "image/jpeg" })],
      },
    });

    fireEvent.click(signupButton);

    expect(onTapSignUpMock).toHaveBeenCalledWith(
      "test@example.com",
      "password123",
      "Test",
      undefined // Use optional chaining and provide a default value (null) if inputElement is null
    );
  });

    it("displays the loading spinner when loading is true", () => {
      const store = mockStore({
        authentication: {
          errorMessage: "",
          loading: true,
          success: false,
        },
      });

      const { getByTestId } = render(
        <MemoryRouter>
          <Provider store={store}>
            <SignupComponent />
          </Provider>
        </MemoryRouter>,
      );

      expect(getByTestId("spinner")).toBeInTheDocument;
    });
});
