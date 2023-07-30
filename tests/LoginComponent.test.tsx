import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { LoginComponent } from "../src/components/LoginComponent";

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
      <Provider store={store}>
        <LoginComponent />
      </Provider>,
    );

    const emailInput = getByLabelText("Email");
    const passwordInput = getByLabelText("Password");
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

    const emailInput = getByLabelText("Email");
    const passwordInput = getByLabelText("Password");
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
      <Provider store={store}>
        <LoginComponent />
      </Provider>,
    );

    expect(getByTestId("spinner")).toBeInTheDocument;
  });
});
