import { useState, startTransition } from 'react';

import {
  useMutation,
  useOthers,
  useStorage,
  useUpdateMyPresence,
} from '../liveblocks.config';

import { LiveList, LiveObject } from '@liveblocks/client';

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
    storage.get('agendaItems')?.push(new LiveObject({ text }));
    // console.log("storage.get('agendaItems')", storage.get('agendaItems'));
    // console.log('agendaItems', agendaItems);
    // const storageFallback = storage.get('agendaItems') || [];
    // storage.set('agendaItems', [...storageFallback, new LiveObject({ text })]);
    // storage.set('agendaItems', [...storageFallback, { text }]);
  }, []);

  const toggleAgendaItem = useMutation(({ storage }, index) => {
    const agenda = storage.get('agendaItems').get(index);
    agenda?.set('checked', !agenda.get('checked'));
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
                {agendaItems?.map((agendaItem, index) => {
                  return (
                    <div key={index} className='todo-container'>
                      <div
                        className='agenda-toggle-container'
                        onClick={() => toggleAgendaItem(index)}
                      >
                        <input
                          type='checkbox'
                          name='checkbox'
                          checked={agendaItem.checked ? true : false}
                          style={{
                            cursor: 'pointer',
                            textDecoration: agendaItem.checked
                              ? 'line-through'
                              : undefined,
                          }}
                        ></input>
                        <span
                          className='todo'
                          style={{
                            cursor: 'pointer',
                            textDecoration: agendaItem.checked
                              ? 'line-through'
                              : undefined,
                          }}
                        >
                          {agendaItem.text}
                        </span>
                        <button
                          className='delete-button'
                          onClick={() => deleteAgendaItem(index)}
                        >
                          ✕
                        </button>
                      </div>
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
