import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import SignupComponent from "../src/components/SignupComponent";
import { MemoryRouter } from "react-router-dom";
import { screen } from "@testing-library/react";

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
      </MemoryRouter>,
    );

    screen.debug();
    // Use getByLabelText to find the PoolifyTextField components
    const emailInput = getByLabelText("Email") as HTMLInputElement;
    const passwordInput = getByLabelText("Password") as HTMLInputElement;
    const displayName = getByLabelText("Display Name") as HTMLInputElement;
    expect(emailInput).toBeInTheDocument;
    expect(passwordInput).toBeInTheDocument;
    expect(displayName).toBeInTheDocument;
    expect(getByText("Signup")).toBeInTheDocument;
    expect(getByText("Forgot Password")).toBeInTheDocument;
    expect(getByText("Sign in")).toBeInTheDocument;
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

    const { getByLabelText, getByText } = render(
      <Provider store={store}>
        <SignupComponent onTapSignUp={onTapSignUpMock} />
      </Provider>,
    );

    const emailInput = getByLabelText("Email") as HTMLInputElement;
    const passwordInput = getByLabelText("Password") as HTMLInputElement;
    const signupButton = getByText("Signup");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(signupButton);

    expect(onTapSignUpMock).toHaveBeenCalledWith(
      "test@example.com",
      "password123",
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
