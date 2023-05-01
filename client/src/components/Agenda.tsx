import React from 'react';
import { useState } from 'react';
import { AgendaProps, AgendaItem } from '../interfaces';
import {
  useMutation,
  useOthers,
  useStorage,
  useUpdateMyPresence,
} from '../liveblocks.config';

import { LiveList, LiveObject } from '@liveblocks/client';

 const Agenda: React.FC<AgendaProps> = ({ selectedRoomId, selectedEventName }) => {
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
  const agendaItems = useStorage((root) => root.agendaItems) as
  | LiveList<{ text: string; checked: boolean }>
  | undefined;
  
  const addAgendaItem = useMutation(({ storage }, text: string) => {
    (storage.get("agendaItems") as LiveList<AgendaItem>).push({ text, checked: false });
            // console.log("storage.get('agendaItems')", storage.get('agendaItems'));
    // console.log('agendaItems', agendaItems);
    // const storageFallback = storage.get('agendaItems') || [];
    // storage.set('agendaItems', [...storageFallback, new LiveObject({ text })]);
    // storage.set('agendaItems', [...storageFallback, { text }]);
  }, []);
  
  const toggleAgendaItem = useMutation(({ storage }, index: number) => {
    const agenda = (storage.get("agendaItems") as LiveList<AgendaItem>).get(index);
    if (agenda) {
      (storage.get("agendaItems") as LiveList<AgendaItem>).set(index, {
        ...agenda,
        checked: !agenda.checked,
      });
    }
  }, []);
  
  
  const deleteAgendaItem = useMutation(({ storage }, index: number) => {
    (storage.get("agendaItems") as LiveList<AgendaItem>).delete(index);
  }, []);
  
  return (
    <div data-testid="agenda-component">
      {selectedRoomId !== 'todo' && (
        <>
          <div className='agenda-test'>
            <h1 className='druk text-outside-boxes inside-margin'>Agenda</h1>
            <p className='container-agenda'>
              <div className='inside-margin'>
                {agendaItems?.map((agendaItem, index) => {
                  return (
                    <div key={index} className='todo-container'>
                      <div
                        className='checkbox-circle todo-toggle-container text-regular'
                        onClick={() => toggleAgendaItem(index)}
                        style={{
                          color: agendaItem.checked ? 'grey' : undefined,
                        }}
                      >
                        <input
                          type='checkbox'
                          name='checkbox'
                          className=''
                          checked={agendaItem.checked ? true : false}
                          style={{
                            cursor: 'pointer',
                            textDecoration: agendaItem.checked
                              ? 'line-through'
                              : undefined,
                          }}
                        ></input>
                        <label
                          className='todo'
                          style={{
                            cursor: 'pointer',
                            textDecoration: agendaItem.checked
                              ? 'line-through'
                              : undefined,
                          }}
                        >
                          {agendaItem.text}
                        </label>
                        <button
                          className='button-delete delete-button'
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
                    className='agenda-input'
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
    </div>
  );
}

export default Agenda;