import {
  useMutation,
  useOthers,
  useStorage,
  useUpdateMyPresence,
} from '../liveblocks.config';
// import { GoogleLogin } from '@react-oauth/google';

export default function Header({
  selectedRoomId,
  selectedEventName,
  selectedEventAttendees,
}) {
  function WhoIsHere() {
    const userCount = useOthers((others) => others.length);

    return (
      <>
        {userCount > 0 ? (
          <div className='who_is_here'>
            Team status: 👯 There are {userCount} other users online
          </div>
        ) : (
          <div className='who_is_here'>
            Team status: 🙆🏻‍♀️ You are the only user editing these notes right now!
          </div>
        )}
      </>
    );
  }

  return (
    <>
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
                    console.log(attendee.email);
                    return <li>{attendee.email}</li>;
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
