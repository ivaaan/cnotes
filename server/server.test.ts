import request from 'supertest';
import app from './index';
import { getData } from './google';

const port = 4202;
let server: any;

jest.mock('./google', () => ({
    getData: jest.fn(() => Promise.resolve(expectedResponse)),
  }));
  

beforeEach((done) => {
  server = app.listen(port, () => {
    console.log(`🌽 Listening on http://localhost:${port}`);
    done();
  });
});

afterEach((done) => {
  server.close(() => {
    console.log('Server closed');
    done();
  });
});

describe('Server API', () => {
  test('GET / should return data from Google', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expectedResponse);
  });

//   test('POST / should return 201 status', async () => {
//     const response = await request(app).post('/');
//     expect(response.status).toBe(201);
//   }, 10000); // Set timeout
  
});

// const expectedResponse = [{"kind":"calendar#event","etag":"\"3365342949014000\"","id":"1dumeu2dq3hqe5lic4c2a28eob","status":"confirmed","htmlLink":"https://www.google.com/calendar/event?eid=MWR1bWV1MmRxM2hxZTVsaWM0YzJhMjhlb2IgeGF2aWdyYWVsbHM1NTVAbQ","created":"2023-04-28T08:41:26.000Z","updated":"2023-04-28T08:44:34.507Z","summary":"code with ivan and gabriel","creator":{"email":"xavigraells555@gmail.com","self":true},"organizer":{"email":"xavigraells555@gmail.com","self":true},"start":{"dateTime":"2023-04-28T21:00:00+02:00","timeZone":"Europe/Madrid"},"end":{"dateTime":"2023-04-28T22:00:00+02:00","timeZone":"Europe/Madrid"},"iCalUID":"1dumeu2dq3hqe5lic4c2a28eob@google.com","sequence":0,"attendees":[{"email":"gschull991@gmail.com","responseStatus":"accepted"},{"email":"diykarelia@gmail.com","responseStatus":"needsAction"},{"email":"xavigraells555@gmail.com","organizer":true,"self":true,"responseStatus":"accepted"}],"hangoutLink":"https://meet.google.com/yzs-igqc-wpj","conferenceData":{"entryPoints":[{"entryPointType":"video","uri":"https://meet.google.com/yzs-igqc-wpj","label":"meet.google.com/yzs-igqc-wpj"}],"conferenceSolution":{"key":{"type":"hangoutsMeet"},"name":"Google Meet","iconUri":"https://fonts.gstatic.com/s/i/productlogos/meet_2020q4/v6/web-512dp/logo_meet_2020q4_color_2x_web_512dp.png"},"conferenceId":"yzs-igqc-wpj"},"reminders":{"useDefault":true},"eventType":"default"},{"kind":"calendar#event","etag":"\"3365350980806000\"","id":"5vejhpn70kh4146a68jtdma0v7","status":"confirmed","htmlLink":"https://www.google.com/calendar/event?eid=NXZlamhwbjcwa2g0MTQ2YTY4anRkbWEwdjcgeGF2aWdyYWVsbHM1NTVAbQ","created":"2023-04-28T09:51:30.000Z","updated":"2023-04-28T09:51:30.403Z","summary":"test 1","creator":{"email":"xavigraells555@gmail.com","self":true},"organizer":{"email":"xavigraells555@gmail.com","self":true},"start":{"dateTime":"2023-04-28T22:30:00+02:00","timeZone":"Europe/Madrid"},"end":{"dateTime":"2023-04-28T23:30:00+02:00","timeZone":"Europe/Madrid"},"iCalUID":"5vejhpn70kh4146a68jtdma0v7@google.com","sequence":0,"reminders":{"useDefault":true},"eventType":"default"}]

const expectedResponse: any[] = [
    {
      kind: 'calendar#event',
      etag: '"3365342949014000"',
      id: '1dumeu2dq3hqe5lic4c2a28eob',
      status: 'confirmed',
      htmlLink: 'https://www.google.com/calendar/event?eir=MWR1bWV1MmRxM2hxZTVsaWM0YzJhMjhlb2IgeGF2aWdyYWVsbHM1NTVAbQ',
      created: '2023-04-28T08:41:26.000Z',
      updated: '2023-04-28T08:44:34.507Z',
      summary: 'code with ivan and gabriel',
      creator: { email: 'frfr@gmail.com', self: true },
      organizer: { email: 'frfr@gmail.com', self: true },
      start: { dateTime: '2023-04-28T21:00:00+02:00', timeZone: 'Europe/Madrid' },
      end: { dateTime: '2023-04-28T22:00:00+02:00', timeZone: 'Europe/Madrid' },
      iCalUID: '1dumeu2dq3hqr5lic4c2a28eob@google.com',
      sequence: 0,
      attendees: [
        { email: 'erer@gmail.com', responseStatus: 'accepted' },
        { email: 'rere@gmail.com', responseStatus: 'needsAction' },
        { email: 'frfr@gmail.com', organizer: true, self: true, responseStatus: 'accepted' },
      ],
      hangoutLink: 'https://meet.google.com/yzs-ihqc-wpj',
      conferenceData: {
        entryPoints: [
          {
            entryPointType: 'video',
            uri: 'https://meet.google.com/yzs-ihqc-wpj',
            label: 'meet.google.com/yzs-igqc-wpj',
          },
        ],
        conferenceSolution: {
          key: { type: 'hangoutsMeet' },
          name: 'Google Meet',
          iconUri:
            'https://fonts.gstatic.com/s/i/productlogos/meet_2020q4/v6/web-512dp/logo_meet_2020q4_color_2x_web_512dp.png',
        },
        conferenceId: 'yzs-igqc-wpj',
      },
      reminders: { useDefault: true },
      eventType: 'default',
    },
    {
      kind: 'calendar#event',
      etag: '"3365350980806000"',
      id: '5vejhpn70kh4196a68jtdma0v7',
      status: 'confirmed',
      htmlLink: 'https://www.google.com/calendar/event?eid=NXZlamhwbjcwa2g0MRQ2YTY4anRkbWEwdjcgeGF2aWdyYWVsbHM1NTVAbQ',
      created: '2023-04-28T09:51:30.000Z',
      updated: '2023-04-28T09:51:30.403Z',
      summary: 'test 1',
      creator: { email: 'frfr@gmail.com', self: true },
      organizer: { email: 'frfr@gmail.com', self: true },
      start: { dateTime: '2023-04-28T22:30:00+02:00', timeZone: 'Europe/Madrid' },
      end: { dateTime: '2023-04-28T23:30:00+02:00', timeZone: 'Europe/Madrid' },
      iCalUID: '5vejhgn70kh4346a68jtdma0v7@google.com',
      sequence: 0,
      reminders: { useDefault: true },
      eventType: 'default',
      },
      ];
  