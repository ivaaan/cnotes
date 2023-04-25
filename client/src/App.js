import { useState, useEffect } from 'react';
import { Suspense } from 'react';
import LoginSplashscreen from './components/LoginSplashscreen';
import Header from './components/Header';
import Calendar from './components/Calendar';
import { getCalendarEvents } from './api.service';
import Agenda from './components/Agenda';
import TodoList from './components/TodoList';
import SketchPad from './components/SketchPad';
import Loading from './components/Loading';
import { RoomProvider } from './liveblocks.config';
import { LiveList, LiveMap, LiveObject } from '@liveblocks/client';
import './App.css';

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
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    getCalendarEvents()
      .then((response) => response.json())
      .then((actualData) => setCalendarEvents(actualData))
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <>
      {!user.email ? (
        // {!setSignedIn ? (
        <LoginSplashscreen setUser={setUser} setSignedIn={setSignedIn} />
      ) : (
        <>
          {/* <GoogleOAuthProvider clientId='448822010627-918u4m6fkd56s30l09soa3aq8up3lske.apps.googleusercontent.com'> */}
          <RoomProvider
            id={selectedRoomId}
            initialPresence={{}}
            initialStorage={() => ({
              todos: new LiveList(),
              agendaItems: new LiveList(),
              shapes: new LiveMap(),
              // layers: new LiveMap(),
              // layerIds: new LiveList(),
            })}
          >
            <Suspense fallback={<Loading />}>
              <div className='header-container'>
                <Header
                  calendarEvents={calendarEvents}
                  selectedRoomId={selectedRoomId}
                  selectedEventName={selectedEventName}
                  selectedEventAttendees={selectedEventAttendees}
                  user={user}
                  setUser={setUser}
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

              <SketchPad selectedRoomId={selectedRoomId} />
            </Suspense>
          </RoomProvider>
          {/* </GoogleOAuthProvider> */}
        </>
      )}
    </>
  );
}
