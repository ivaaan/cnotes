import { useState, startTransition } from 'react';

import {
  useMutation,
  useOthers,
  useStorage,
  useUpdateMyPresence,
} from '../liveblocks.config';

export default function TodoList({ selectedRoomId, selectedEventName }) {
  function WhoIsHere() {
    const userCount = useOthers((others) => others.length);

    return (
      <>
        {userCount > 0 ? (
          <div className='who_is_here'>
            Team status: 👯 There are {userCount} other users online
          </div>
        ) : (
          <div className='who_is_here'>
            Team status: 🙆🏻‍♀️ You are the only user editing these notes right now!
          </div>
        )}
      </>
    );
  }

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

  const [draft, setDraft] = useState('');
  const updateMyPresence = useUpdateMyPresence();
  const todos = useStorage((root) => root.todos);

  const addTodo = useMutation(({ storage }, text) => {
    storage.get('todos').push({ text });
  }, []);

  const deleteTodo = useMutation(({ storage }, index) => {
    storage.get('todos').delete(index);
  }, []);

  return (
    <>
      <p>
        {selectedRoomId !== 'todo' && (
          <>
            <h1 className='text-outside-boxes inside-margin'>
              Team notes for {selectedEventName} event
            </h1>
            <p className='text-outside-boxes inside-margin'>
              <WhoIsHere />
            </p>
            <p className='rounded-box'>
              <div className='inside-margin'>
                {todos.map((todo, index) => {
                  return (
                    <div key={index} className='todo-container'>
                      <input
                        type='radio'
                        // checked='checked'
                        name='radio'
                      ></input>
                      <span className='todo'>{todo.text}</span>
                      <button
                        className='delete-button'
                        onClick={() => deleteTodo(index)}
                      >
                        ✕
                      </button>
                    </div>
                  );
                })}
                <div className='center-container'>
                  <input
                    type='text'
                    placeholder='What needs to be done?'
                    value={draft}
                    onChange={(e) => {
                      setDraft(e.target.value);
                      updateMyPresence({ isTyping: true });
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        updateMyPresence({ isTyping: false });
                        addTodo(draft);
                        setDraft('');
                      }
                    }}
                    onBlur={() => updateMyPresence({ isTyping: false })}
                  />
                  <SomeoneIsTyping />
                </div>
              </div>
            </p>
          </>
        )}
      </p>
    </>
  );
}
