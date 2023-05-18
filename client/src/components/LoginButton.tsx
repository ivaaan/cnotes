import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const LoginButton: React.FC = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  return (
    <>
      {!isAuthenticated && (
        <p
          className="text-outside-boxes header-right-child button-inter header-logout"
          onClick={() => loginWithRedirect()}
          data-testid="loginbuttontest"
        >
          Log in with Google
        </p>
      )}
    </>
  );
};

export default LoginButton;
