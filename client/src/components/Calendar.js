import { format } from 'date-fns';

export default function Calendar({
  calendarEvents,
  setSelectedRoomId,
  setSelectedEventName,
  setSelectedEventAttendees,
}) {
  return (
    <>
      {calendarEvents.length > 0 ? (
        <p>
          <div className=''>
            {calendarEvents.map((event) => (
              <div
                className='inside-margin button-inter cal cal-single-event'
                key={event.id}
                onClick={(e) => {
                  setSelectedRoomId(event.id);
                  setSelectedEventName(event.summary);
                  // console.log('event in Calendar', event);
                  console.log('event.attendees in Calendar', event.attendees);
                  setSelectedEventAttendees(event.attendees);
                  e.currentTarget.classList.toggle('event-was-selected');
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
        </p>
      ) : (
        <p>
          <h1>⏳ Loading calendar events...</h1>
        </p>
      )}
    </>
  );
}
