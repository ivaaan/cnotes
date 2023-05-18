import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

interface LogoutButtonProps {
  user: {
    firstname?: string;
    lastname?: string;
    email?: string;
  } | null;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ user }) => {
  const { isAuthenticated, logout } = useAuth0();

  return (
    <>
      {isAuthenticated && (
        <p
          className="header-right-child button-inter header-logout"
          onClick={() => {
            logout();
            console.log("Auth0 logged out!");
          }}
        >
          Sign out of {user?.firstname} {user?.lastname}
        </p>
      )}
    </>
  );
};

export default LogoutButton;
