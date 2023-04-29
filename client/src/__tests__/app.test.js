import { render, screen } from '@testing-library/react';
import App from '../App';
import { useAuth0 } from '@auth0/auth0-react';
import { getCalendarEvents } from '../api.service';

jest.mock('@auth0/auth0-react', () => ({
  useAuth0: () => ({
    isAuthenticated: true,
    user: {
      email: 'test@example.com',
      given_name: 'Test',
      family_name: 'User',
    },
    isLoading: false,
  }),
}));

jest.mock('../api.service', () => ({
    getCalendarEvents: () =>
      Promise.resolve({
        json: () =>
          Promise.resolve([
            {
              id: '1',
              summary: 'Test Event',
              start: { dateTime: '2023-05-01T10:00:00' },
              end: { dateTime: '2023-05-01T12:00:00' },
              attendees: [],
            },
          ]),
      }),
  }));
  

test('renders App component without crashing', () => {
  render(<App />);
  const appComponent = screen.getByTestId('app-component');
  expect(appComponent).toBeInTheDocument();
});

test('renders Calendar component when authenticated', async () => {
  render(<App />);
  const calendarComponent = await screen.findByTestId('calendar-component');
  expect(calendarComponent).toBeInTheDocument();
});
