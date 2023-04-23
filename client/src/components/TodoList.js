import { useState, startTransition } from 'react';

import {
  useMutation,
  useOthers,
  useStorage,
  useUpdateMyPresence,
} from '../liveblocks.config';

import { LiveList, LiveObject } from '@liveblocks/client';

export default function TodoList({
  selectedRoomId,
  selectedEventName,
  selectedEventAttendees,
  user,
}) {
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
  // const currentUser = 'diykarelia@gmail.com';

  // const addTodo = useMutation(({ storage }, text) => {
  //   // console.log({ todos });
  //   const storageFallback = storage.get('todos') || [];
  //   // console.log('pushing', pushing);
  //   storage.set('todos', [...storageFallback, { text }]);
  //   // pushing?.push(new LiveObject({ text }));
  //   // console.log('todos', storage.get('todos'));
  // }, []);

  const addTodo = useMutation(({ storage }, text) => {
    // console.log(todos);
    // console.log({ selectedRoomId });
    storage.get('todos').push(new LiveObject({ text, assignee: user.email }));
    // storage.get('todos').push(new LiveObject({ text}));
  }, []);

  const toggleTodo = useMutation(({ storage }, index) => {
    const todo = storage.get('todos').get(index);
    // console.log({ todo });
    // console.log('printing user', { user });
    todo?.set('checked', !todo.get('checked'));
    // console.log('AFTER', { todo });
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
                      <div
                        className='todo-toggle-container'
                        onClick={() => toggleTodo(index)}
                      >
                        <input
                          type='checkbox'
                          name='checkbox'
                          checked={todo.checked ? true : false}
                          style={{
                            cursor: 'pointer',
                            textDecoration: todo.checked
                              ? 'line-through'
                              : undefined,
                          }}
                        ></input>
                        <span
                          className='todo'
                          style={{
                            cursor: 'pointer',
                            textDecoration: todo.checked
                              ? 'line-through'
                              : undefined,
                          }}
                        >
                          {todo.text}
                          {'  '}
                          {todo.assignee ? <>(🙋🏻: {todo.assignee})</> : <></>}
                        </span>
                        <button
                          className='delete-button'
                          onClick={() => deleteTodo(index)}
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
                  {selectedEventAttendees ? (
                    <p>
                      Assign to:{' '}
                      <select name='todo-assignee' id='todo-assignee'>
                        <option value='assigned-to-team'></option>
                        {selectedEventAttendees.map((attendee) => {
                          {
                            return (
                              <option value={attendee.email}>
                                {attendee.email}
                              </option>
                            );
                          }
                        })}
                      </select>
                    </p>
                  ) : (
                    <></>
                  )}

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
