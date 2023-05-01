import { ReactNode } from 'react';


export interface User {
  email: string | undefined;
  firstname: string | undefined;
  lastname: string | undefined;
}

  export interface RoomProviderProps {
    id: string;
    initialPresence: object;
    initialStorage: () => object;
    children: ReactNode;
  }
  
  export interface CalendarProps {
    calendarEvents: any[]; // You can replace any with a more specific type for your calendar events
    setSelectedRoomId: (roomId: string) => void;
    setSelectedEventName: (eventName: string | null) => void;
    setSelectedEventAttendees: (attendees: any[]) => void; // You can replace any with a more specific type for your attendees
  }
  
  export interface AgendaProps {
    selectedRoomId: string;
    selectedEventName: string | null;
  }
  export type AgendaItem = { text: string; checked: boolean };

  export interface TodoListProps {
    selectedRoomId: string;
    selectedEventName: string | null;
    selectedEventAttendees: any[]; // You can replace any with a more specific type for your attendees
    user: User;
  }