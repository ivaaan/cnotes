import { useState, useEffect } from 'react';
import { useOthers } from '../liveblocks.config';
import jwt_decode from 'jwt-decode';
import logo from '../cnotes-logo.png';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './LoginButton';

export default function Header({
  handleSignOut,
  selectedRoomId,
  selectedEventName,
  selectedEventAttendees,
  user,
  setUser,
}) {
  const Profile = () => {
    const { user, isLoading, isAuthenticated } = useAuth0();

    useEffect(() => console.log(user), [user]);

    if (isLoading) {
      console.log('loading');
    } else if (!isAuthenticated) {
      console.log('authenticated: ', isAuthenticated);
    } else if (!isLoading && isAuthenticated) {
      const { name, picture, email } = user;
      return <div>{name}</div>;
    }
  };

  function LogoutButton() {
    const { isAuthenticated, logout } = useAuth0();

    return (
      // isAuthenticated && (
      <button
        onClick={() => {
          logout({
            // logoutParams: {
            //   returnTo: window.location.origin,
            // },
          });
        }}
      >
        Auth0 Log out
      </button>
      // )
    );
  }

  function handleSignOut(event) {
    // Resetting the user to default - change to {} when we go to prod
    setUser({});
    // Hiding the google HTML form
    // document.getElementById('signInDiv').hidden = false;
  }

  function WhoIsHere() {
    const userCount = useOthers((others) => others.length);

    return (
      <>
        {userCount > 0 ? (
          <div className='who_is_here'>
            👯 There are {userCount} other users online
          </div>
        ) : (
          <div className='who_is_here'>
            🙆🏻‍♀️ You are the only user editing these notes right now!
          </div>
        )}
      </>
    );
  }

  return (
    <>
      {user && (
        <>
          <div>
            <img className='logo-header' src={logo} />
            <h1 className='header text-outside-boxes'>CNotes</h1>
          </div>
          <div className='header-right'>
            <p className='header-right-child text-outside-boxes inside-margin'>
              <LoginButton />
              <LogoutButton />
              <Profile />
              <p
                className='header-right-child button-inter header-logout'
                onClick={(e) => handleSignOut(e)}
              >
                Sign out of {user.firstname} {user.lastname}
              </p>
            </p>
          </div>
        </>
      )}
      <div>
        <h1 className='druk text-outside-boxes inside-margin'>
          {selectedEventName
            ? 'Team notes for:'
            : '👇🏻 Select a calendar event:'}
        </h1>
        <h1 className='text-outside-boxes inside-margin'>
          {selectedEventName ? selectedEventName : ''}
        </h1>
      </div>
      <div>
        {selectedRoomId !== 'todo' && (
          <>
            {selectedEventAttendees ? (
              <p className='text-outside-boxes inside-margin'>
                Team members in this calendar event:
                {selectedEventAttendees.map((attendee) => {
                  {
                    return (
                      <>
                        {attendee.email === user.email ? (
                          <></>
                        ) : (
                          <li>{attendee.email}</li>
                        )}
                      </>
                    );
                  }
                })}
              </p>
            ) : (
              <p className='text-outside-boxes inside-margin'>
                This calendar event does not have any attendees yet.
              </p>
            )}
            <p className='text-outside-boxes inside-margin'>
              <WhoIsHere />
            </p>
          </>
        )}
      </div>
      {/* <p>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            console.log(credentialResponse);
          }}
          onError={() => {
            console.log('Login Failed');
          }}
        />
        ;
      </p>
      <p>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            console.log(credentialResponse);
          }}
          onError={() => {
            console.log('Login Failed');
          }}
          useOneTap
        />
      </p> */}
    </>
  );
}
