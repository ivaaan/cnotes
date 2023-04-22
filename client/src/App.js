import { useState, useEffect } from 'react';
import Header from './components/Header';
import Calendar from './components/Calendar';
import { getCalendarEvents } from './api.service';
import Agenda from './components/Agenda';
import TodoList from './components/TodoList';
import SketchPad from './components/SketchPad';
import { RoomProvider } from './liveblocks.config';
import { LiveList, LiveMap } from '@liveblocks/client';
import './App.css';
// import { GoogleOAuthProvider } from '@react-oauth/google';
import { gapi } from 'gapi-script';
import Login from './components/Login';
const clientId =
  '448822010627-918u4m6fkd56s30l09soa3aq8up3lske.apps.googleusercontent.com';

export default function App() {
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [selectedRoomId, setSelectedRoomId] = useState('todo');
  const [selectedEventName, setSelectedEventName] = useState(null);

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: '',
      });
    }

    gapi.load('client:auth2', start);

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
        initialStorage={
          ({ todos: new LiveList() },
          { agendaItems: new LiveList() },
          {
            shapes: new LiveMap(),
          })
        }
      >
        <div className='header-container'>
          <Login />
          <Header
            selectedRoomId={selectedRoomId}
            selectedEventName={selectedEventName}
          />
        </div>
        <div className='container'>
          <Calendar
            calendarEvents={calendarEvents}
            setSelectedRoomId={setSelectedRoomId}
            setSelectedEventName={setSelectedEventName}
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
        <SketchPad />
      </RoomProvider>
      {/* </GoogleOAuthProvider> */}
    </>
  );
}
