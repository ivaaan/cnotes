import React from 'react';
import {render, screen, fireEvent} from "@testing-library/react"
import '@testing-library/jest-dom';
import LoginButton from "../components/LoginButton"
import {useAuth0} from "@auth0/auth0-react"

jest.mock("@auth0/auth0-react", () => ({
  useAuth0: jest.fn(),
}));

describe('Login Button Tests', () => {


  it('should render the login button correctly', () => {
    // Mock the isAuthenticated value to be false
    useAuth0.mockReturnValue({
      isAuthenticated: false,
      loginWithRedirect: jest.fn(),
    });

    render(<LoginButton />);
    expect(screen.getByTestId('loginbuttontest')).toHaveTextContent('Log in with Google');
  });
  it('should call loginWithRedirect when the button is clicked', () => {
    // Mock the isAuthenticated value to be false
    const loginWithRedirect = jest.fn();
    useAuth0.mockReturnValue({
      isAuthenticated: false,
      loginWithRedirect,
    });

    render(<LoginButton />);

    fireEvent.click(screen.getByTestId('loginbuttontest'));

    expect(loginWithRedirect).toHaveBeenCalled();
    
    const loginContainer = screen.getByTestId('loginbuttontest');
    expect(loginContainer).toHaveClass('text-outside-boxes header-right-child button-inter header-logout');
   
  });
});