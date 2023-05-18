import React from "react";
import { render, fireEvent } from "@testing-library/react";
import LogoutButton from "../components/LogoutButton";

jest.mock("@auth0/auth0-react", () => ({
  useAuth0: () => ({
    isAuthenticated: true,
    logout: jest.fn(() => console.log('Auth0 logged out!')),
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

});