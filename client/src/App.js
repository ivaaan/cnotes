import { useState, useEffect } from 'react';
import Header from './components/Header';
import Calendar from './components/Calendar';
import { getCalendarEvents } from './api.service';
import Agenda from './components/Agenda';
import TodoList from './components/TodoList';
import { RoomProvider } from './liveblocks.config';
import { LiveList } from '@liveblocks/client';
import './App.css';

export default function App() {
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [selectedRoomId, setSelectedRoomId] = useState('todo');
  const [selectedEventName, setSelectedEventName] = useState(null);

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
      <RoomProvider
        id={selectedRoomId}
        initialPresence={{}}
        initialStorage={{ todos: new LiveList() }}
      >
        <div className='header-container'>
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
      </RoomProvider>
    </>
  );
}
