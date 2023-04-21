import { useState, startTransition } from 'react';

import {
  useMutation,
  useOthers,
  useStorage,
  useUpdateMyPresence,
} from '../liveblocks.config';

export default function Agenda({ selectedRoomId, selectedEventName }) {
  function SomeoneIsTyping() {
    const someoneIsTyping = useOthers((others) =>
      others.some((other) => other.presence.isTyping)
    );

    return (
      <div className='someone_is_typing'>
        {someoneIsTyping ? 'Someone is typing...' : ''}
      </div>
    );
  }

  const [draftAgenda, setDraftAgenda] = useState('');
  const updateMyPresence = useUpdateMyPresence();
  const agendaItems = useStorage((root) => root.agendaItems);

  const addAgendaItem = useMutation(({ storage }, text) => {
    storage.get('agendaItems').push({ text });
  }, []);

  const deleteAgendaItem = useMutation(({ storage }, index) => {
    storage.get('agendaItems').delete(index);
  }, []);

  return (
    <>
      {selectedRoomId !== 'todo' && (
        <>
          <div>
            <h1 className='text-outside-boxes inside-margin'>Agenda</h1>
            <p className='rounded-box'>
              <div className='inside-margin'>
                {agendaItems.map((agendaItem, index) => {
                  return (
                    <div key={index} className='todo-container'>
                      <input
                        type='radio'
                        // checked='checked'
                        name='radio'
                      ></input>
                      <span className='todo'>{agendaItem.text}</span>
                      <button
                        className='delete-button'
                        onClick={() => deleteAgendaItem(index)}
                      >
                        ✕
                      </button>
                    </div>
                  );
                })}
                <div className='center-container'>
                  <input
                    type='text'
                    placeholder='Add a new agenda item'
                    value={draftAgenda}
                    onChange={(e) => {
                      setDraftAgenda(e.target.value);
                      updateMyPresence({ isTyping: true });
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        updateMyPresence({ isTyping: false });
                        addAgendaItem(draftAgenda);
                        setDraftAgenda('');
                      }
                    }}
                    onBlur={() => updateMyPresence({ isTyping: false })}
                  />
                  <p className='text-regular'>
                    <SomeoneIsTyping />
                  </p>
                </div>
              </div>
            </p>
          </div>
        </>
      )}
    </>
  );
}
