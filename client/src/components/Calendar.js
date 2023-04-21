import { format } from 'date-fns';

export default function Calendar({
  calendarEvents,
  setSelectedRoomId,
  setSelectedEventName,
}) {
  return (
    <>
      {calendarEvents.length > 0 ? (
        <p>
          <div className='rounded-box'>
            {calendarEvents.map((event) => (
              <div
                className='inside-margin rounded-box-cal-event'
                key={event.id}
                onClick={() => {
                  setSelectedRoomId(event.id);
                  setSelectedEventName(event.summary);
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
