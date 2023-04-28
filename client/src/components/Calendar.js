import { format } from 'date-fns';
import { useState } from 'react';

export default function Calendar({
  calendarEvents,
  setSelectedRoomId,
  setSelectedEventName,
  setSelectedEventAttendees,
}) {
  const [isActive, setActive] = useState(false);
  const toggleClass = (i) => {
    setActive(i);
  };

  return (
    < div data-testid="calendar-component">
      {calendarEvents.length > 0 ? (
        <div className='cal-container'>
          {calendarEvents.map((event, index) => (
            <div
              // className='inside-margin button-inter cal cal-single-event'
              className={
                isActive === index
                  ? 'event-was-selected inside-margin button-inter cal cal-single-event'
                  : 'inside-margin button-inter cal cal-single-event'
              }
              key={event.id}
              onClick={(e) => {
                setSelectedRoomId(event.id);
                setSelectedEventName(event.summary);
                // console.log('event in Calendar', event);
                console.log('event.attendees in Calendar', event.attendees);
                setSelectedEventAttendees(event.attendees);
                // e.currentTarget.classList.toggle('event-was-selected');
                toggleClass(index);
              }}
            >
              <div className='inside-margin'>
                <p>{event.summary}</p>
                {/* Checking if the event is multi-day or date-time format */}
                {event.start.date ? (
                  <p className='text-regular'>
                    {format(new Date(event.start.date), 'MMMM do')} to{' '}
                    {format(new Date(event.end.date), 'MMMM do, yyyy')}
                  </p>
                ) : (
                  <p className='text-regular'>
                    {format(
                      new Date(event.start.dateTime),
                      'MMMM do, yyyy - hh:mm aaaa'
                    )}{' '}
                    to {format(new Date(event.end.dateTime), 'hh:mm aaaa')}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>
          <h1>⏳ Loading calendar events...</h1>
        </p>
      )}
    </div>
  );
}
