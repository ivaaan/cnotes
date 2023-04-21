import { useState, useEffect } from 'react';
import Calendar from './components/Calendar';
import { getCalendarEvents } from './api.service';
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
      <div className='container'>
        <Calendar
          calendarEvents={calendarEvents}
          setSelectedRoomId={setSelectedRoomId}
          setSelectedEventName={setSelectedEventName}
        />
        <RoomProvider
          id={selectedRoomId}
          initialPresence={{}}
          initialStorage={{ todos: new LiveList() }}
        >
          <TodoList
            selectedRoomId={selectedRoomId}
            selectedEventName={selectedEventName}
          />
        </RoomProvider>
      </div>
    </>
  );
}
