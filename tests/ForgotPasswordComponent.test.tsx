import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // For additional matchers
import { ForgotPasswordComponent } from "../src/components/ForgotPasswordComponent";

describe("ForgotPasswordComponent", () => {
  test("renders without error", () => {
    render(<ForgotPasswordComponent />);
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Send Password" }),
    ).toBeInTheDocument();
  });

  test("calls onTapForgotPassword when Send Password button is clicked", () => {
    const mockOnTapForgotPassword = jest.fn();
    render(
      <ForgotPasswordComponent onTapForgotPassword={mockOnTapForgotPassword} />,
    );

    const emailInput = screen.getByLabelText("Email");
    const sendPasswordButton = screen.getByRole("button", {
      name: "Send Password",
    });

    fireEvent.change(emailInput, { target: { value: "johndoe@gmail.com" } });
    fireEvent.click(sendPasswordButton);

    expect(mockOnTapForgotPassword).toHaveBeenCalledTimes(1);
    expect(mockOnTapForgotPassword).toHaveBeenCalledWith("johndoe@gmail.com");
  });

  test("calls onClose when Snackbar is closed", () => {
    const mockOnClose = jest.fn();
    render(<ForgotPasswordComponent onClose={mockOnClose} />);

    const snackbar = screen.getByRole("alert");
    fireEvent.click(screen.getByText("Close")); // Assuming there's a "Close" button in the snackbar

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
