import { useState, startTransition } from 'react';

import {
  useMutation,
  useOthers,
  useStorage,
  useUpdateMyPresence,
} from '../liveblocks.config';

import { LiveList, LiveObject } from '@liveblocks/client';

export default function TodoList({ selectedRoomId, selectedEventName }) {
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

  // const addTodo = useMutation(({ storage }, text) => {
  //   // console.log({ todos });
  //   const storageFallback = storage.get('todos') || [];
  //   // console.log('pushing', pushing);
  //   storage.set('todos', [...storageFallback, { text }]);
  //   // pushing?.push(new LiveObject({ text }));
  //   // console.log('todos', storage.get('todos'));
  // }, []);

  const addTodo = useMutation(({ storage }, text) => {
    console.log(todos);
    console.log({ selectedRoomId });
    storage.get('todos').push(new LiveObject({ text }));
  }, []);

  const deleteTodo = useMutation(({ storage }, index) => {
    storage.get('todos').delete(index);
  }, []);

  return (
    <>
      {selectedRoomId !== 'todo' && (
        <>
          <div>
            <h1 className='text-outside-boxes inside-margin'>To-Do List</h1>
            <p className='rounded-box'>
              <div className='inside-margin'>
                {todos?.map((todo, index) => {
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
                    placeholder='Add a new task here'
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
