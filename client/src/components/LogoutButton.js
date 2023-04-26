import { useAuth0 } from '@auth0/auth0-react';

export default function LogoutButton({ user }) {
  const { isAuthenticated, logout } = useAuth0();

  return (
    isAuthenticated && (
      <>
        {/* <button>Auth0 Log out</button> */}
        <p
          className='header-right-child button-inter header-logout'
          onClick={() => {
            logout({
              // logoutParams: {
              //   returnTo: window.location.origin,
              // },
            });
            console.log('Auth0 logged out!');
          }}
        >
          Sign out of {user.firstname} {user.lastname}
        </p>
      </>
    )
  );
}
