import React from "react";
import { render, fireEvent } from "@testing-library/react";
import LogoutButton from "../components/LogoutButton";

jest.mock("@auth0/auth0-react", () => ({
  useAuth0: () => ({
    isAuthenticated: true,
    logout: jest.fn(),
  }),
}));

describe("LogoutButton", () => {
  it("renders without crashing", () => {
    render(<LogoutButton user={{ firstname: "John", lastname: "Doe" }} />);
  });

  it("displays the user name in the sign out button", () => {
    const { getByText } = render(
      <LogoutButton user={{ firstname: "John", lastname: "Doe" }} />
    );
    expect(getByText("Sign out of John Doe")).toBeInTheDocument();
  });

  it("calls the logout function when clicked", () => {
    const { getByText } = render(
      <LogoutButton user={{ firstname: "John", lastname: "Doe" }} />
    );
    fireEvent.click(getByText("Sign out of John Doe"));
    expect(jest.fn()).toHaveBeenCalled();
  });
});
