import { useState, useEffect } from 'react';
import { useOthers } from '../liveblocks.config';
import jwt_decode from 'jwt-decode';

export default function Header({
  handleSignOut,
  selectedRoomId,
  selectedEventName,
  selectedEventAttendees,
  user,
  setUser,
}) {
  function handleCallbackResponse(response) {
    console.log('Encoded JWT ID token: ' + response.credential);
    let userObject = jwt_decode(response.credential);
    // if (userObject.email !== 'diykarelia@gmail.com') {
    setUser({
      email: userObject.email,
      firstname: userObject.given_name,
      lastname: userObject.family_name,
    });
    // }
    document.getElementById('signInDiv').hidden = true;
  }

  function handleSignOut(event) {
    // Resetting the user to default - change to {} when we go to prod
    setUser({});
    // Hiding the google HTML form
    document.getElementById('signInDiv').hidden = false;
  }

  useEffect(() => {
    // /* global google */
    window.google.accounts.id.initialize({
      client_id:
        '448822010627-918u4m6fkd56s30l09soa3aq8up3lske.apps.googleusercontent.com',
      callback: handleCallbackResponse,
    });

    // window.google.accounts.id.prompt();

    window.google.accounts.id.renderButton(
      document.getElementById('signInDiv'),
      {
        theme: 'outline',
        size: 'large',
      }
    );
  }, []);

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
      <div id='signInDiv'></div>
      {Object.keys(user).length != 0 && (
        <>
          {/* <button onClick={(e) => handleSignOut(e)}>Sign out</button> */}
          <p onClick={(e) => handleSignOut(e)}>Sign out</p>
        </>
      )}
      {user && (
        <>
          <div>
            <p className='text-outside-boxes inside-margin'></p>
          </div>
          <div>
            {user.email && (
              <p className='text-outside-boxes inside-margin'>
                Logged in as: {user.firstname} {user.lastname}
              </p>
            )}
          </div>
        </>
      )}
      <p>
        <h1 className='text-outside-boxes inside-margin'>
          Select a calendar event
        </h1>
      </p>
      <p>
        {selectedRoomId !== 'todo' && (
          <>
            <h1 className='text-outside-boxes inside-margin'>
              Team notes for {selectedEventName} event
            </h1>
            {selectedEventAttendees ? (
              <p className='text-outside-boxes inside-margin'>
                Team members:
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
      </p>
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
