import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';

export default function LoginButton() {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  return (
    !isAuthenticated && (
      <p
        className='text-outside-boxes header-right-child button-inter header-logout'
        onClick={loginWithRedirect} data-testid= "loginbuttontest"
      >
      Log in with Google
      </p>
    )
  );
}
