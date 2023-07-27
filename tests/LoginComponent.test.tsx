import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { LoginComponent } from '../src/components/LoginComponent';

const mockStore = configureStore([]);

describe('LoginComponent', () => {
  it('renders the login form correctly', () => {
    const store = mockStore({
      authentication: {
        errorMessage: '',
        loading: false,
        success: false,
      },
    });

    const { getByLabelText, getByText } = render(
      <Provider store={store}>
        <LoginComponent />
      </Provider>
    );

    expect(getByLabelText('Email') as HTMLInputElement).toBeInTheDocument();
    expect(getByLabelText('Password')as HTMLInputElement).toBeInTheDocument();
    expect(getByText('Login')).toBeInTheDocument();
    expect(getByText('Sign Up')).toBeInTheDocument();
    expect(getByText('Forgot Password')).toBeInTheDocument();
  });

  it('calls onTapSignIn function with correct email and password', () => {
    const store = mockStore({
      authentication: {
        errorMessage: '',
        loading: false,
        success: false,
      },
    });

    const onTapSignInMock = jest.fn();

    const { getByLabelText, getByText } = render(
      <Provider store={store}>
        <LoginComponent onTapSignIn={onTapSignInMock} />
      </Provider>
    );

    const emailInput = getByLabelText('Email') as HTMLInputElement;
    const passwordInput = getByLabelText('Password') as HTMLInputElement;
    const loginButton = getByText('Login');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);

    expect(onTapSignInMock).toHaveBeenCalledWith('test@example.com', 'password123');
  });

  it('displays the loading spinner when loading is true', () => {
    const store = mockStore({
      authentication: {
        errorMessage: '',
        loading: true,
        success: false,
      },
    });

    const { getByTestId } = render(
      <Provider store={store}>
        <LoginComponent />
      </Provider>
    );

    expect(getByTestId('spinner')).toBeInTheDocument();
  });

  // Add more test cases for other functionality as needed
});
