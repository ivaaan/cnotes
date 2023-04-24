import { useState, useEffect } from 'react';
import { useOthers } from '../liveblocks.config';
import jwt_decode from 'jwt-decode';
import logo from '../cnotes-logo.png';

export default function Header({
  handleSignOut,
  selectedRoomId,
  selectedEventName,
  selectedEventAttendees,
  user,
  setUser,
}) {
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
            <p className='text-outside-boxes inside-margin'>
              Logged in as: {user.firstname} {user.lastname}
              <span
                className='header-logout text-outside-boxes inside-margin'
                onClick={(e) => handleSignOut(e)}
              >
                Sign out
              </span>
            </p>
          </div>
        </>
      )}
      <div>
        <h1 className='text-outside-boxes inside-margin'>
          {selectedEventName
            ? 'Team notes for ' + selectedEventName
            : 'Select a calendar event'}
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
