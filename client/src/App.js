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

export default function App() {
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [selectedRoomId, setSelectedRoomId] = useState('todo');
  const [selectedEventName, setSelectedEventName] = useState(null);
  const [selectedEventAttendees, setSelectedEventAttendees] = useState([]);
  const [user, setUser] = useState({
    email: 'diykarelia@gmail.com',
    firstname: 'Ivan',
    lastname: 'Zoloto',
  });

  function handleCallbackResponse(response) {
    let userObject = jwt_decode(response.credential);
    if (userObject.email !== 'diykarelia@gmail.com') {
      setUser({
        email: userObject.email,
        firstname: userObject.given_name,
        lastname: userObject.family_name,
      });
    }
    document.getElementById('signInDiv').hidden = true;
  }

  function handleSignOut(event) {
    setUser({});
    document.getElementById('signInDiv').hidden = false;
  }

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

    // const client = window.google.accounts.oauth2.initTokenClient({
    //   client_id:
    //     '448822010627-918u4m6fkd56s30l09soa3aq8up3lske.apps.googleusercontent.com',
    //   callback: 'onTokenResponse',
    //   scope: 'https://www.googleapis.com/auth/calendar.readonly',
    // });
    // client.requestAccessToken();

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
        })}
      >
        <Suspense fallback={<Loading />}>
          <div className='header-container'>
            <Header
              handleSignOut={handleSignOut}
              calendarEvents={calendarEvents}
              selectedRoomId={selectedRoomId}
              selectedEventName={selectedEventName}
              selectedEventAttendees={selectedEventAttendees}
              user={user}
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
              selectedEventAttendees={selectedEventAttendees}
              user={user}
            />
          </div>
          {/* <SketchPad /> */}
        </Suspense>
      </RoomProvider>
      {/* </GoogleOAuthProvider> */}
    </>
  );
}
