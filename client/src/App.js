import { useState, useEffect } from 'react';
import { Suspense } from 'react';
import Header from './components/Header';
import Calendar from './components/Calendar';
import { getCalendarEvents } from './api.service';
import Agenda from './components/Agenda';
import TodoList from './components/TodoList';
import SketchPad from './components/SketchPad';
import Loading from './components/Loading';
import { RoomProvider } from './liveblocks.config';
import { LiveList, LiveMap } from '@liveblocks/client';
import './App.css';
import jwt_decode from 'jwt-decode';
// import { GoogleOAuthProvider } from '@react-oauth/google'
// import { getData } from './google.service';

export default function App() {
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [selectedRoomId, setSelectedRoomId] = useState('todo');
  const [selectedEventName, setSelectedEventName] = useState(null);
  const [selectedEventAttendees, setSelectedEventAttendees] = useState([]);
  const [user, setUser] = useState({});

  function handleCallbackResponse(response) {
    // console.log('Encoded JWT ID token: ', response.credential);
    let userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject);
    document.getElementById('signInDiv').hidden = true;
  }

  function handleSignOut(event) {
    setUser({});
    document.getElementById('signInDiv').hidden = false;
  }

  // function calNewFunc() {
  //   getData();
  //   console.log('calNewFunc()', getData());
  // }

  useEffect(() => {
    // /* global google */
    window.google.accounts.id.initialize({
      client_id:
        '448822010627-918u4m6fkd56s30l09soa3aq8up3lske.apps.googleusercontent.com',
      callback: handleCallbackResponse,
    });

    window.google.accounts.id.prompt();

    window.google.accounts.id.renderButton(
      document.getElementById('signInDiv'),
      {
        theme: 'outline',
        size: 'large',
      }
    );

    // This method request the oauth consent for the passed in google account.
    // function oauthSignIn(googleId) {
    //   const client = window.google.accounts.oauth2.initTokenClient({
    //     client_id:
    //       '448822010627-918u4m6fkd56s30l09soa3aq8up3lske.apps.googleusercontent.com',
    //     scope: 'https://www.googleapis.com/auth/calendar.readonly',
    //     hint: googleId,
    //     prompt: '', // Specified as an empty string to auto select the account which we have already consented for use.
    //     callback: (tokenResponse) => {
    //       access_token = tokenResponse.access_token;
    //       onOneTapSignIn(access_token); // Reuse the token whichever way you want
    //     },
    //   });
    //   client.requestAccessToken();
    // }

    const client = window.google.accounts.oauth2.initTokenClient({
      client_id:
        '448822010627-918u4m6fkd56s30l09soa3aq8up3lske.apps.googleusercontent.com',
      callback: 'onTokenResponse',
      scope: 'https://www.googleapis.com/auth/calendar.readonly',
    });
    client.requestAccessToken();

    getCalendarEvents()
      .then((response) => response.json())
      .then((actualData) => setCalendarEvents(actualData))
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <>
      {/* <GoogleOAuthProvider clientId='448822010627-918u4m6fkd56s30l09soa3aq8up3lske.apps.googleusercontent.com'> */}
      <RoomProvider
        id={selectedRoomId}
        initialPresence={{}}
        initialStorage={() => ({
          todos: new LiveList(),
          agendaItems: new LiveList(),
          shapes: new LiveMap(),

          // fruitsByName: new LiveMap([
          //   ['apple', '🍎'],
          //   ['banana', '🍌'],
          //   ['cherry', '🍒'],
          // ]),
        })}
      >
        <Suspense fallback={<Loading />}>
          {/* initialStorage={() => ({
           { agendaItems: new LiveList() },
           { todos: new LiveList(['🦁', '🦊', '🐵']) },
           { shapes: new LiveMap() },
           {
             fruitsByName: new LiveMap([
             ['apple', '🍎'],
               ['banana', '🍌'],
               ['cherry', '🍒'],
             ]),
           },
           { animals: new LiveList(['🦁', '🦊', '🐵']) },
           {
             animalAgenda: new LiveList(['agenda 🦁', 'hello 🦊', ' world 🐵']),
           }
         })
         }
       > */}
          <div className='header-container'>
            <div id='signInDiv'></div>
            {Object.keys(user).length != 0 && (
              <button onClick={(e) => handleSignOut(e)}>Sign out</button>
            )}
            {user && (
              <div>
                <img src={user.picture}></img>
                <h1>{user.name}</h1>
              </div>
            )}
            <Header
              calendarEvents={calendarEvents}
              selectedRoomId={selectedRoomId}
              selectedEventName={selectedEventName}
              selectedEventAttendees={selectedEventAttendees}
            />
          </div>
          <div className='container'>
            <Calendar
              calendarEvents={calendarEvents}
              setSelectedRoomId={setSelectedRoomId}
              setSelectedEventName={setSelectedEventName}
              setSelectedEventAttendees={setSelectedEventAttendees}
            />
            <Agenda
              selectedRoomId={selectedRoomId}
              selectedEventName={selectedEventName}
            />
            <TodoList
              selectedRoomId={selectedRoomId}
              selectedEventName={selectedEventName}
            />
          </div>
          {/* <SketchPad /> */}
        </Suspense>
      </RoomProvider>
      {/* </GoogleOAuthProvider> */}
    </>
  );
}
