import { useOthers } from '../liveblocks.config';

export default function Header({
  handleSignOut,
  selectedRoomId,
  selectedEventName,
  selectedEventAttendees,
  user,
}) {
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
        <button onClick={(e) => handleSignOut(e)}>Sign out</button>
      )}
      {user && (
        <div>
          <h1>
            {user.firstname} {user.lastname}
          </h1>
        </div>
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
