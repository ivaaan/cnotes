# CNotes: a note-taking app for team calls.

CNotes ("call notes") syncs with Google Calendar and creates a multi-user note-taking page that allows everyone who's on the call to edit it. The page has the following sections: Google Calendar (to click on events and see notes for each event), call agenda, to-do list, text notes, possibly drawing pad or flowcharts, etc.

## MVP

Users should be able to log into the app via their Google account, see the events for that day, click on any event and see the call notes. If there's more than one user in the current note, all users should see the moving cursors and messages like "someone is typing".

## To run the server:

```bash
cd server
npm i
touch credentials.json
```

On the credentials.json file, add your Google Calendar API keys.

Run the server and after loading, a token.json file will be created on server root folder (only the first time the server is runned).

To run component testing on server:

```bash
npx jest
```

## To run client:

```bash
cd client
touch .env
```

Add your auth0 and liveblock keys to the .env file as per below exact names:

```
REACT_APP_AUTH0_DOMAIN="your-domain-key"
REACT_APP_AUTH0_CLIENT_ID="your-client-id-key"
REACT_APP_LIVEBLOCK_PUBLIC_API_KEY="your-livebloc-public-api-key"
```

To run component testing on client:

```bash
npm run test
```

## To run lint:

```bash
cd client
npm i
npm run format
```

End to end testing with cypress:

```bash
npm i
npx cypress open
```
