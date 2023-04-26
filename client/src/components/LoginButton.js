import { useAuth0 } from '@auth0/auth0-react';

export default function LoginButton() {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  return (
    !isAuthenticated && (
      <p
        className='text-outside-boxes header-right-child button-inter header-logout'
        onClick={loginWithRedirect}
      >
        Log in with Google
      </p>
    )
  );
}
