import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { LoginComponent } from "../src/components/LoginComponent";
import { MemoryRouter } from "react-router-dom";
import { screen } from "@testing-library/react";

const mockStore = configureStore([]);

describe("LoginComponent", () => {
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
          <LoginComponent />
        </Provider>
        Xp
      </MemoryRouter>,
    );

    screen.debug();
    // Use getByLabelText to find the PoolifyTextField components
    const emailInput = getByLabelText("Email") as HTMLInputElement;
    const passwordInput = getByLabelText("Password") as HTMLInputElement;
    console.log("email input" + emailInput);
    expect(emailInput).toBeInTheDocument;
    expect(passwordInput).toBeInTheDocument;
    expect(getByText("Login")).toBeInTheDocument;
    expect(getByText("Forgot Password")).toBeInTheDocument;
    expect(getByText("Sign Up")).toBeInTheDocument;
    expect(getByText("Login")).toBeInTheDocument;
    expect(getByText("Sign Up")).toBeInTheDocument;
    expect(getByText("Forgot Password")).toBeInTheDocument;
  });

  it("calls onTapSignIn function with correct email and password", () => {
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

    const onTapSignInMock = jest.fn();

    const { getByLabelText, getByText } = render(
      <Provider store={store}>
        <LoginComponent onTapSignIn={onTapSignInMock} />
      </Provider>,
    );

    const emailInput = getByLabelText("Email") as HTMLInputElement;
    const passwordInput = getByLabelText("Password") as HTMLInputElement;
    const loginButton = getByText("Login");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(loginButton);

    expect(onTapSignInMock).toHaveBeenCalledWith(
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
          <LoginComponent />
        </Provider>
      </MemoryRouter>,
    );

    expect(getByTestId("spinner")).toBeInTheDocument;
  });
});