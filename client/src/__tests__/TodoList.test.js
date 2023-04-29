import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from './TodoList';

describe('TodoList', () => {
  const selectedRoomId = 'test-room';
  const selectedEventName = 'test-event';
  const selectedEventAttendees = [{ email: 'test1@example.com' }, { email: 'test2@example.com' }];
  const user = { email: 'test@example.com' };

  it('renders the component without errors', () => {
    render(
      <TodoList
        selectedRoomId={selectedRoomId}
        selectedEventName={selectedEventName}
        selectedEventAttendees={selectedEventAttendees}
        user={user}
      />
    );
    expect(screen.getByText('To-Do List')).toBeInTheDocument();
  });

  it('adds a new todo when the user types and presses Enter', () => {
    render(
      <TodoList
        selectedRoomId={selectedRoomId}
        selectedEventName={selectedEventName}
        selectedEventAttendees={selectedEventAttendees}
        user={user}
      />
    );
    const todoInput = screen.getByPlaceholderText('Add a new task here');
    fireEvent.change(todoInput, { target: { value: 'Test todo' } });
    fireEvent.keyDown(todoInput, { key: 'Enter' });
    expect(screen.getByText('Test todo')).toBeInTheDocument();
  });

  it('marks a todo as completed when the user clicks the checkbox', () => {
    render(
      <TodoList
        selectedRoomId={selectedRoomId}
        selectedEventName={selectedEventName}
        selectedEventAttendees={selectedEventAttendees}
        user={user}
      />
    );
    const todoCheckbox = screen.getByLabelText('checkbox');
    fireEvent.click(todoCheckbox);
    expect(todoCheckbox).toBeChecked();
  });

  it('deletes a todo when the user clicks the delete button', () => {
    render(
      <TodoList
        selectedRoomId={selectedRoomId}
        selectedEventName={selectedEventName}
        selectedEventAttendees={selectedEventAttendees}
        user={user}
      />
    );
    const deleteButton = screen.getByRole('button', { name: '✕' });
    fireEvent.click(deleteButton);
    expect(deleteButton).not.toBeInTheDocument();
  });
});