export default function Calendar({
  calendarEvents,
  setSelectedRoomId,
  setSelectedEventName,
}) {
  return (
    <>
      {calendarEvents.length > 0 ? (
        <p>
          <h1 className='text-outside-boxes inside-margin'>
            Select a calendar event
          </h1>

          <div className='rounded-box'>
            {calendarEvents.map((event) => (
              <div
                className='inside-margin'
                key={event.id}
                onClick={() => {
                  setSelectedRoomId(event.id);
                  setSelectedEventName(event.summary);
                }}
              >
                <p>{event.summary}</p>
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
