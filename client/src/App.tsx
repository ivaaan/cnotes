import React, { useState, useEffect, ReactNode } from "react";
import { Suspense } from "react";
import LoginSplashscreen from "./components/LoginSplashscreen";
import Header from "./components/Header";
import Calendar from "./components/Calendar";
import { getCalendarEvents } from "./api.service";
import Agenda from "./components/Agenda";
import TodoList from "./components/TodoList";
import SketchPad from "./components/SketchPad";
import Loading from "./components/Loading";
import { RoomProvider } from "./liveblocks.config";
import { LiveList, LiveMap, LiveObject } from "@liveblocks/client";
import "./App.css";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import { User } from "./interfaces";
import DrawingPad from "./components/DrawingPad";

export default function App() {
  const { user, isLoading, isAuthenticated } = useAuth0();
  let authenticatedUserProfile: User | undefined;
  const [calendarEvents, setCalendarEvents] = useState<any[]>([]);
  const [selectedRoomId, setSelectedRoomId] = useState<string>("todo");
  const [selectedEventName, setSelectedEventName] = useState<string | null>(
    null
  );
  const [selectedEventAttendees, setSelectedEventAttendees] = useState<any[]>(
    []
  ); // You can replace any with a more specific type for your attendees
  const [currentUser, setCurrentUser] = useState<User>({
    email: "test@gmail.com",
    firstname: "Test",
    lastname: "Test",
  });

  // function Wrapper({ children }) {
  //   const { isLoading, error } = useAuth0();
  //   if (isLoading) {
  //     return <div>Loading...</div>;
  //   }
  //   if (error) {
  //     return <div>Oops... {error.message}</div>;
  //   }
  //   return <>{children}</>;
  // }

  useEffect(() => {
    if (!isAuthenticated) {
      console.log("Auth0 isAuthenticated:", isAuthenticated);
    } else if (isAuthenticated) {
      console.log("Auth0 user: ", user);
      setCurrentUser({
        email: user?.email,
        firstname: user?.given_name,
        lastname: user?.family_name,
      });
      console.log("currentUser after the setter func", currentUser);
    }

    getCalendarEvents()
      .then((response) => response && response.json())

      .then((actualData) => setCalendarEvents(actualData))
      .catch((err) => {
        console.log(err.message);
      });
  }, [isAuthenticated]);

  return (
    <div data-testid="app-component">
      {/* <Wrapper> */}
      {!isAuthenticated ? (
        <LoginSplashscreen setCurrentUser={setCurrentUser} />
      ) : (
        <>
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
              <div className="header-container">
                <Header
                  calendarEvents={calendarEvents}
                  selectedRoomId={selectedRoomId}
                  selectedEventName={selectedEventName}
                  selectedEventAttendees={selectedEventAttendees}
                  user={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              </div>
              <div className="container">
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
                  user={currentUser}
                />
              </div>
              <SketchPad
                selectedRoomId={selectedRoomId}
                selectedEventName={selectedEventName}
              />
              <div className="drawing-pad-wrapper">
                <DrawingPad
                  selectedRoomId={selectedRoomId}
                  selectedEventName={selectedEventName}
                />
              </div>
            </Suspense>
          </RoomProvider>
        </>
      )}
      {/* </Wrapper> */}
    </div>
  );
}
