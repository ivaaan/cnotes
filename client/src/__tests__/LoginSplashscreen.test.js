import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import LoginSplashscreen from "../components/LoginSplashscreen";
import LoginButton from "../components/LoginButton";

jest.mock("../cnotes-logo-splashscreen.png", () => "mock-logo");

describe("Login Splashscreen Tests", () => {
  it("Should render the logo", () => {
    render(<LoginSplashscreen />);

    const logo = screen.getByRole("img");
    expect(logo).toBeInTheDocument();
  });

  it("Should render the header", () => {
    render(<LoginSplashscreen />);

    const header = screen.getByText("Welcome to CNotes");
    expect(header).toBeInTheDocument();
  });

  it("Should render the description", () => {
    render(<LoginSplashscreen />);

    const description = screen.getByText(
      "Your go-to app for taking notes and creating to-dos during work calls."
    );
    expect(description).toBeInTheDocument();
  });

  it("Should render the login button", () => {
    render(<LoginSplashscreen />);

    const loginButton = screen.getByTestId("loginbuttontest");
    expect(loginButton).toBeInTheDocument();
  });
});
